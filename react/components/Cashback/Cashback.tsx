/* eslint-disable no-console */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useCssHandles } from 'vtex.css-handles';
import { FormattedCurrency } from 'vtex.format-currency';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import type { CashbackProps } from '../../typings/Cashback';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = ['container', 'value'] as const;

/**
 * declaracion del componente
 */
const Cashback: StorefrontFunctionComponent<CashbackProps> = ({
    specification,
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const { orderForm } = useOrderForm();
    const { items } = orderForm;
    const cashBackTotal = items
        ?.map((item: any) => {
            const cashBackSpecification = item?.skuSpecifications?.find(
                (skuSpecification: any) => skuSpecification?.fieldName === specification,
            )?.fieldValues[0] || 0;
            const cashBackValue = item?.price * item.quantity * (cashBackSpecification / 100);
            return cashBackValue;
        })
        .reduce(
            (previousValue: number, currentValue: number) => previousValue + currentValue,
        );
    return (
        <>
            <div className={`pt3 mv3 ph6-l fw5-l ${handles.container}`}>
                <span
                    className={`flex items-center justify-between ${handles.value}`}
                >
                    <FormattedMessage id="store/editor.cash-back.label" />
                    {' '}
                    <FormattedCurrency
                        value={
                            cashBackTotal ? cashBackTotal / 100 : cashBackTotal
                        }
                    />
                </span>
            </div>
        </>
    );
};

/**
 * propiedades por defecto del componete
 */
Cashback.defaultProps = {
    specification: 'CashBack',
};

/**
 * esquema base del componenete esto habilita el site editor desde el admin
 */

Cashback.schema = {
    title: 'admin/editor.cash-back.title',
    description: 'admin/editor.cash-back.description',
    properties: {
        specification: {
            title: 'admin/editor.cash-back.specification.label.title',
            type: 'string',
        },
    },
};

export default Cashback;
