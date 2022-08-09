import React, { ChangeEvent, useState } from 'react';
import { CurrencyInfo } from '../../interfaces/currencyInfo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addCurrency } from '../../redux/slices/briefcaseSlice';
import { useTranslation } from 'react-i18next';

interface ModalAddCurrencyProps {
  setIsOpen: (option: boolean) => void;
  currency: CurrencyInfo | null | undefined;
}

const ModalAddCurrency = ({ setIsOpen, currency }: ModalAddCurrencyProps) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number | string>('');
  const { t } = useTranslation();

  const onInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.match(/^([0-9]+)?(\.)?([0-9]+)?$/)) {
      setCount(input);
    }
  };

  const onInputBlur = () => {
    if (typeof count === 'string') {
      setCount(parseFloat(count) || '');
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onAddCurrency = () => {
    if (currency) {
      dispatch(
        addCurrency({
          id: currency.id,
          name: currency.name,
          initialPrice: parseFloat(currency.priceUsd),
          count: +count,
        })
      );
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="modal__background" onClick={onCloseModal} />
      <div className="modal modal_add-currency">
        <div className="stack stack_vertical modal__container">
          <button className="close-button" onClick={onCloseModal}>
            X
          </button>
          <div className="modal__heading">
            {t('modal_currency_heading')} {currency?.name}
          </div>
          <p>{t('modal_currency_message')}</p>
          <div className="stack modal__input-area">
            <input
              className="modal__input"
              placeholder="Type amount..."
              value={count}
              onChange={onInputAmount}
              onBlur={onInputBlur}
            />
            <button
              className="accept-button"
              onClick={onAddCurrency}
              disabled={count == '' || +count <= 0}
            >
              {t('modal_currency_button')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddCurrency;
