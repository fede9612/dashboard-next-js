'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'pending']),
  date: z.string()
})

const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({ id: true, date: true })

export async function createInvoince (formData:FormData) {
  const { customerId, amount, status } = CreateInvoiceFormSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })
  const amountInCents = amount * 100
  const date = new Date().toISOString()

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `
  } catch (error) {
    return {
      message: 'An error occurred while creating the invoice. Please try again.'
    }
  }
  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
