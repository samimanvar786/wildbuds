"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../lib/api/users";

type Address = {
  id: number;
  user: number;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: "billing" | "shipping";
  is_default: boolean;
  created_at: string;
};

// FORM TYPE
type AddressPayload = {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: "billing" | "shipping";
  is_default: boolean;
};

export default function UserDetailsCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const [user] = useState({
    name: "Samim Anvar",
    phone: "+919650158623",
    email: "samim@example.com",
  });

  const emptyForm: AddressPayload = {
    full_name: user.name,
    phone: user.phone,
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "India",
    postal_code: "",
    address_type: "billing",
    is_default: false,
  };

  const [formData, setFormData] = useState<AddressPayload>({ ...emptyForm });

  useEffect(() => {
    refreshAddresses();
  }, []);

  const refreshAddresses = async () => {
    setLoading(true);
    try {
      const data = await listAddresses();
      setAddresses(data);

      // 🔥 FIX: if no address exists → open form automatically
      if (data.length === 0) {
        setIsEditing(true);
        setEditingAddressId(null);
        setFormData({ ...emptyForm });
      }

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasAddress = addresses.length > 0;
  
  const handleChange = (field: keyof AddressPayload, value: any) => {
    setFormData((s) => ({ ...s, [field]: value }));
  };

  const startAdd = () => {
    setEditingAddressId(null);
    setFormData({ ...emptyForm });
    setIsEditing(true);
  };

  const startEdit = (addr: Address) => {
    setEditingAddressId(addr.id);
    setFormData({
      full_name: addr.full_name,
      phone: addr.phone,
      address_line_1: addr.address_line_1,
      address_line_2: addr.address_line_2 || "",
      city: addr.city,
      state: addr.state,
      country: addr.country,
      postal_code: addr.postal_code,
      address_type: addr.address_type,
      is_default: addr.is_default,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (editingAddressId) {
        await updateAddress(editingAddressId, formData);
        toast.success("Address updated");
      } else {
        await createAddress(formData);
        toast.success("Address created");
      }
      setIsEditing(false);
      refreshAddresses();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = (id: number) => {
    toast.warning("Confirm delete?", {
      description: (
        <div className="flex gap-3 mt-2">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={async () => {
              try {
                await deleteAddress(id);
                toast.success("Address deleted");
                refreshAddresses();
              } catch (err: any) {
                toast.error(err.error || err.message);
              }
            }}
          >
            Delete
          </button>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      ),
    });
  };

  const renderAddressCard = (addr: Address) => (
    <div key={addr.id} className="border p-3 rounded mb-2 bg-white">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{addr.full_name}</div>
          <div className="text-sm">
            {addr.address_line_1} {addr.address_line_2}
          </div>
          <div className="text-sm">
            {addr.city}, {addr.state} - {addr.postal_code}
          </div>
          <div className="text-sm">{addr.country}</div>
          <div className="text-sm">{addr.phone}</div>
          <div className="text-xs mt-1">
            {addr.address_type}{" "}
            {addr.is_default ? <span className="text-green-600">(Default)</span> : ""}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => startEdit(addr)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(addr.id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">

      <div className="border rounded-md bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-xs uppercase text-gray-500 font-semibold">
            Delivery Addresses
          </h3>

          {!isEditing && addresses.length > 0 && (
            <button
              onClick={startAdd}
              className="text-blue-600 text-sm font-semibold"
            >
              ADD
            </button>
          )}
        </div>

        {loading && <div>Loading...</div>}

        {!isEditing && addresses.map(renderAddressCard)}

        {isEditing && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Full Name"
                className="border p-2 rounded"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
              />

              <input
                placeholder="Phone"
                className="border p-2 rounded"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />

              <input
                placeholder="Address Line 1"
                className="border p-2 rounded md:col-span-2"
                value={formData.address_line_1}
                onChange={(e) =>
                  handleChange("address_line_1", e.target.value)
                }
              />

              <input
                placeholder="Address Line 2"
                className="border p-2 rounded md:col-span-2"
                value={formData.address_line_2}
                onChange={(e) =>
                  handleChange("address_line_2", e.target.value)
                }
              />

              <input
                placeholder="City"
                className="border p-2 rounded"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />

              <input
                placeholder="State"
                className="border p-2 rounded"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />

              <input
                placeholder="Country"
                className="border p-2 rounded"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />

              <input
                placeholder="Postal Code"
                className="border p-2 rounded"
                value={formData.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value)}
              />

              <select
                className="border p-2 rounded"
                value={formData.address_type}
                onChange={(e) =>
                  handleChange("address_type", e.target.value as any)
                }
              >
                <option value="billing">Billing</option>
                <option value="shipping">Shipping</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={(e) =>
                    handleChange("is_default", e.target.checked)
                  }
                />
                Set as default
              </label>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
