import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { Product } from '@/types/product';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = (product: Product, quantity = 1) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || product.featured_image || '',
        quantity,
        slug: product.slug,
        size: product.size,
      })
    );
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
  };
};
