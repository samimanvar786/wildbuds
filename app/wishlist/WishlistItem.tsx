 <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center max-w-md mx-auto py-20">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">Save your favorite plants to your wishlist and never lose track of them.</p>
            <Link href="/products">
              <Button className="bg-[#03312f] hover:bg-[#024a46]">Discover Plants</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-600">{wishlistItems.length} items saved</p>
              </div>
              <Button
                variant="outline"
                onClick={addAllToCart}
                disabled={!wishlistItems.some(item => item.inStock)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add All to Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onRemove={removeFromWishlist}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>