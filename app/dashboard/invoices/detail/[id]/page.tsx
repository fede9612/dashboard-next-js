import { fetchInvoiceById } from '@/app/lib/data'
import { Card } from '@/app/ui/dashboard/cards'

export default async function Detail ({ params }: {params: { id: string}}) {
  const invoice = await fetchInvoiceById(params.id)
  return (
    <div className='grid gap-6 grid-cols-2'>
      <Card title='Amount' value={invoice.amount} type='invoices' />
      <Card title='Status' value={invoice.status} type='invoices' />
      <Card title='Customer ID' value={invoice.customer_id} type='customers' />
    </div>

  )
}
