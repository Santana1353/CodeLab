
import { useState } from 'react'
import {
  Calculator,
  ShoppingCart,
  RotateCcw,
  Receipt,
  Tag,
} from 'lucide-react'
import ExercisePageLayout from '../../../components/ExercisePageLayout'

export default function Exercise11() {
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatMoney = (value) =>
    `RD$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  const calculateInvoice = (event) => {
    event.preventDefault()

    const unitPrice = Number(price)
    const units = Number(quantity)

    if (price.trim() === '' || quantity.trim() === '') {
      setError('Completa el precio y la cantidad de artículos.')
      setResult(null)
      return
    }

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      setError('El precio debe ser mayor que cero.')
      setResult(null)
      return
    }

    if (!Number.isSafeInteger(units) || units <= 0) {
      setError('La cantidad debe ser un número entero mayor que cero.')
      setResult(null)
      return
    }

    const salePrice = unitPrice * units
    const tax = Math.round((salePrice * 0.15 + Number.EPSILON) * 100) / 100
    const grossPrice = Math.round((salePrice + tax) * 100) / 100

    // El descuento aplica únicamente cuando el precio bruto supera 50.
    const discount = grossPrice > 50
      ? Math.round((grossPrice * 0.05 + Number.EPSILON) * 100) / 100
      : 0

    const total = Math.round((grossPrice - discount) * 100) / 100

    setResult({
      unitPrice,
      units,
      salePrice,
      tax,
      grossPrice,
      discount,
      total,
    })

    setError('')
  }

  const clearInvoice = () => {
    setPrice('')
    setQuantity('1')
    setResult(null)
    setError('')
  }

  return (
    <ExercisePageLayout
      exerciseNumber={11}
      title="Factura de compra con IVA"
      statement="Emitir la factura de una compra de un artículo del que se adquieren una o varias unidades. El IVA es del 15% y si el precio bruto (precio de venta más IVA) es mayor de 50.00 pesetas se debe realizar un descuento del 5%."
    >
      <div className="invoice-exercise">

        <div className="invoice-intro">
          <div className="invoice-icon">
            <Receipt size={22} />
          </div>

          <div>
            <h3>Generar factura</h3>
            <p>
              Introduce el precio del artículo y la cantidad
              que deseas comprar.
            </p>
          </div>
        </div>

        <form onSubmit={calculateInvoice}>
          <div className="invoice-fields">

            <div className="invoice-field">
              <label htmlFor="article-price">
                Precio por artículo
              </label>

              <div className="invoice-input">
                <span className="invoice-input-symbol">$</span>

                <input
                  id="article-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Ej. 100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <span className="invoice-input-unit">RD$</span>
              </div>
            </div>

            <div className="invoice-field">
              <label htmlFor="article-quantity">
                Cantidad de artículos
              </label>

              <div className="invoice-input">
                <ShoppingCart size={18} />

                <input
                  id="article-quantity"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Ej. 2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <span className="invoice-input-unit">unidades</span>
              </div>
            </div>

          </div>

          {error && (
            <p className="invoice-error">{error}</p>
          )}

          <div className="invoice-actions">
            <button type="submit" className="invoice-calculate">
              <Calculator size={17} />
              Generar factura
            </button>

            <button
              type="button"
              className="invoice-reset"
              onClick={clearInvoice}
            >
              <RotateCcw size={16} />
              Limpiar
            </button>
          </div>
        </form>

        {result && (
          <div className="invoice-result">

            <div className="invoice-result-heading">
              <span>FACTURA DE COMPRA</span>
              <span className="invoice-success">Calculada</span>
            </div>

            <div className="invoice-total-main">
              <p>Total a pagar</p>
              <h2>{formatMoney(result.total)}</h2>
              <span>
                {result.units} artículo(s) · {formatMoney(result.unitPrice)} por unidad
              </span>
            </div>

            <div className="invoice-details">
              <h4>Desglose de la factura</h4>

              <div className="invoice-row">
                <div>
                  <strong>Precio de venta</strong>
                  <span>
                    {result.units} × {formatMoney(result.unitPrice)}
                  </span>
                </div>
                <strong>{formatMoney(result.salePrice)}</strong>
              </div>

              <div className="invoice-row">
                <div>
                  <strong>IVA (15 %)</strong>
                  <span>Impuesto sobre el precio de venta</span>
                </div>
                <strong>{formatMoney(result.tax)}</strong>
              </div>

              <div className="invoice-row invoice-gross">
                <div>
                  <strong>Precio bruto</strong>
                  <span>Precio de venta + IVA</span>
                </div>
                <strong>{formatMoney(result.grossPrice)}</strong>
              </div>

              <div className="invoice-row">
                <div>
                  <strong>
                    <Tag size={14} className="invoice-tag-icon" />
                    Descuento (5 %)
                  </strong>
                  <span>
                    {result.discount > 0
                      ? 'Aplicado porque supera los 50.00'
                      : 'No aplica: el precio bruto no supera los 50.00'}
                  </span>
                </div>
                <strong className="invoice-discount">
                  -{formatMoney(result.discount)}
                </strong>
              </div>

              <div className="invoice-row invoice-final">
                <strong>Total a pagar</strong>
                <strong>{formatMoney(result.total)}</strong>
              </div>
            </div>

            <p className="invoice-note">
              El IVA se calcula sobre el precio de venta.
              El descuento se aplica al precio bruto cuando este
              supera los 50.00.
            </p>

          </div>
        )}

        {!result && !error && (
          <div className="invoice-empty">
            <Receipt size={27} />
            <p>La factura aparecerá aquí después de realizar el cálculo.</p>
          </div>
        )}

      </div>
    </ExercisePageLayout>
  )
}
