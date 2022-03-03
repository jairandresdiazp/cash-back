$(document).ready(function () {
    $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
        calculateCashBack(orderForm);
    });
});

const calculateCashBack = async (orderForm) => {
    const currencySymbol = orderForm.storePreferencesData.currencySymbol;
    const clientCurrency = orderForm.clientPreferencesData.locale;
    const items = orderForm.items;
    let cashBackTotal = [];
    let cashBackValue = 0;

    for (let indexItem = 0; indexItem < items.length; indexItem++) {
        const item = items[indexItem];

        await $.ajax({
            url: '/api/catalog_system/pvt/sku/stockkeepingunitbyid/' + item.id,
            type: 'GET',
        })
            .done(function (skuData) {
                const skuSpecifications = skuData.SkuSpecifications;
                let cashBackSpecification = 0;

                for (
                    let indexSkuSpecifications = 0;
                    indexSkuSpecifications < skuSpecifications.length;
                    indexSkuSpecifications++
                ) {
                    const skuSpecification =
                        skuSpecifications[indexSkuSpecifications];

                    if (skuSpecification.FieldName == 'CashBack') {
                        try {
                            cashBackSpecification =
                                skuSpecification.FieldValues[0];
                        } catch (error) { }
                    }
                }

                const cashBack =
                    item.price * item.quantity * (cashBackSpecification / 100);

                cashBackTotal.push(cashBack);
            })
            .fail(function (error) {
                console.error('error GET SKU ', error);
            });
    }

    try {
        cashBackValue = cashBackTotal.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        );
        cashBackValue = cashBackValue / 100;
    } catch (error) {
        console.log('error sum cashBack', error);
    }

    try {
        const HTMLCashBack = `\n <tr class="cashBack-row">\n <td class="info">Cash Back</td>\n <td class="space"></td>\n<td class="monetary">${currencySymbol} ${new Intl.NumberFormat(
            clientCurrency
        ).format(cashBackValue)}</td>\n <td class="empty"></td>\n</tr>`;

        $('.totalizers-list .Items').before(HTMLCashBack);
    } catch (error) { }
};
