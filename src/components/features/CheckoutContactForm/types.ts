import type { CheckoutContactValues } from '@/pages/CheckoutPage/types'

export type CheckoutContactFormProps = {
  initialValues: CheckoutContactValues
  disabled?: boolean
  onValidChange: (values: CheckoutContactValues | null) => void
}
