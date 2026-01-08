import axios from "axios";

// lib/api.ts
export interface CustomerPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country?: string;
  password: string;
}

export interface RegisterUserPayload {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface BillingPayload {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface CombinedResponse {
  user: any;
  billing: any;
}

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// -------------------------------
// Token Helpers
// -------------------------------
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("access_token");
}

// -------------------------------
// Response Helper
// -------------------------------
async function handleRes(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const error = data?.detail || data?.message || res.statusText;
    throw new Error(error['non_field_errors']);
  }
  return data;
}

// -------------------------------
// User APIs
// -------------------------------
// export const createUser = async (data: CustomerPayload) => {
//   const res = await fetch(`${BASE_URL}/api/users/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return handleRes(res);
// };

export const checkEmailExists = async (email: string) => {
  const res = await fetch(`${BASE_URL}/api/users/check-email?email=${email}`);
  if (!res.ok) return false;
  return res.json().then((d) => d.exists);
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleRes(res);
    
    // Save JWT token
    if (typeof window !== "undefined" && data?.access) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh || "");
      localStorage.setItem("user", data.user || "");
    }

    return data;
  } catch (error: any) {
    // Normalize error format
    const errMessage =
      error?.error || error?.message || "Invalid email or password";

    // Re-throw the error so handleSubmit can toast it
    throw { error: errMessage };
  }
};

export const getUser = async () => {
  const res = await fetch(`${BASE_URL}/api/users/me/`, {
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
  });
  return handleRes(res);
};

// -------------------------------
// Register user + billing
// -------------------------------
// 🔧 UPDATED: Added options parameter for auto-login
export const registerUserWithBilling = async (
  userData: RegisterUserPayload,
  billingData: BillingPayload,
  options?: {
    autoLoginPassword?: string;
    saveTokenToLocalStorage?: boolean;
  }
): Promise<CombinedResponse> => {
  try {
    // 1️⃣ Register user
    const userRes = await fetch(`${BASE_URL}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const user = await handleRes(userRes);

    // 🔧 UPDATED: Optional auto-login logic
    if (options?.autoLoginPassword) {
      const login = await loginUser(
        userData.email,
        options.autoLoginPassword
      );

      if (
        options.saveTokenToLocalStorage &&
        typeof window !== "undefined"
      ) {
        localStorage.setItem("access_token", login.access);
        localStorage.setItem("refresh_token", login.refresh || "");
        localStorage.setItem("refresh_token", login.user || "");
      }
    }

    // 3️⃣ Create billing address
    const billingRes = await fetch(`${BASE_URL}/api/users/billing/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(billingData),
    });

    const billing = await handleRes(billingRes);

    return { user, billing };
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new Error(error.message || "Registration failed");
  }
};

export async function registerUser(payload: RegisterPayload) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/register/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // Axios error handling (clean & safe)
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Registration failed";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
}


// -------------------------------
// ADDRESS CRUD APIs
// -------------------------------
export async function listAddresses() {
  try {
    const res = await fetch(`${BASE_URL}/api/users/addresses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
    });

    const data = await handleRes(res);
    console.log("data", data);
    return data;

  } catch (error: any) {
    throw {
      error: error.error || error.message || "Unauthorized",
    };
  }
}

export async function createAddress(payload: {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: "billing" | "shipping";
  is_default?: boolean;
}) {
  const res = await fetch(`${BASE_URL}/api/users/addresses/`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function updateAddress(id: number, payload: Partial<any>) {
  const res = await fetch(`${BASE_URL}/api/users/addresses/${id}/`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function partialUpdateAddress(id: number, payload: Partial<any>) {
  const res = await fetch(`${BASE_URL}/api/users/addresses/${id}/`, {
    method: "PATCH",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}

export async function deleteAddress(id: number) {
  const res = await fetch(`${BASE_URL}/api/users/addresses/${id}/`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (res.status === 204) return { success: true };
  return handleRes(res);
}


