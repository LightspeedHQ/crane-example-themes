# Example product layout

This layout uses the Storefront product, favorites, and cart APIs exposed through `@lightspeed/ecom-headless`.
It supports checkbox options and passes their selected values to the cart as arrays.

## Known platform limitations

The native Storefront supports the cases below, but the Headless Storefront bridge and `@lightspeed/ecom-headless`
do not yet expose all data or operations required to reproduce them safely in a custom product layout:

- **File options:** the product contract identifies a file option, but no upload operation is available. The layout does
  not render file inputs and keeps purchase disabled for products that require them.
- **Custom-price products:** the cart accepts a selected price, but the product contract does not provide all limits and
  price tiers needed to build and validate the input.
- **Subscription products:** the cart accepts recurring settings, but the product contract does not provide available
  intervals, one-time-purchase availability, or subscription prices.
- **Gift cards and composite products:** their required purchase configuration is not represented by the current product
  contract.

Until those API gaps are closed, the layout only enables Add to Cart for products whose `purchaseKind` is `NORMAL`.

The custom product page is intentionally disabled in the template manifest until the Product, Catalog, and Category
pages are ready for rollout. Set the product page section `id` to `example-product` only in a testing branch.
