# Size Guide

The `cash-back` is the block is responsible show the seller information

![image](https://user-images.githubusercontent.com/17678382/149598906-32b84053-1d33-4d19-827f-d1941a37d92b.png)

## Configuration

1. Import the `blacksipqa.cash-back` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
    "dependencies": {
        "blacksipqa.cash-back": "0.x"
    }
}
```

2. Add the `cash-back` block to any block below `store.home`. For example:

```json
{
    "store.home": {
        "blocks": ["cash-back"]
    }
}
```

| Prop name       | Type     | Description                                | Default value |
| --------------- | -------- | ------------------------------------------ | ------------- |
| `specification` | `String` | SKU specification containing the cash back | `CashBack`    |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- |
| `container` |
| `value`     |
