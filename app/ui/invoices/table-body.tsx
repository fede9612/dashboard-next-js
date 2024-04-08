'use client'

import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'
import Image from 'next/image'
import InvoiceStatus from './status'
import { DeleteInvoice, UpdateInvoice } from './buttons'
import { InvoicesTable } from '@/app/lib/definitions'
import Link from 'next/link'
import React from 'react'

export default function TableBody ({ invoices }: {invoices: InvoicesTable[]}) {
  return (
    <tbody className='bg-white'>
      {invoices?.map((invoice) => (
        <tr
          key={invoice.id}
          className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
        >
          <td className='whitespace-nowrap py-3 pl-6 pr-3'>
            <LinkTd invoiceId={invoice.id}>
              <div className='flex items-center gap-3'>
                <Image
                  src={invoice.image_url}
                  className='rounded-full'
                  width={28}
                  height={28}
                  alt={`${invoice.name}'s profile picture`}
                />
                <p>{invoice.name}</p>
              </div>
            </LinkTd>
          </td>
          <td className='whitespace-nowrap px-3 py-3'>
            <LinkTd invoiceId={invoice.id}>
              {invoice.email}
            </LinkTd>
          </td>
          <td className='whitespace-nowrap px-3 py-3'>
            <LinkTd invoiceId={invoice.id}>
              {formatCurrency(invoice.amount)}
            </LinkTd>
          </td>
          <td className='whitespace-nowrap px-3 py-3'>
            <LinkTd invoiceId={invoice.id}>
              {formatDateToLocal(invoice.date)}
            </LinkTd>
          </td>
          <td className='whitespace-nowrap px-3 py-3'>
            <LinkTd invoiceId={invoice.id}>
              <InvoiceStatus status={invoice.status} />
            </LinkTd>
          </td>
          <td className='whitespace-nowrap py-3 pl-6 pr-3'>
            <LinkTd invoiceId={invoice.id}>
              <div className='flex justify-end gap-3'>
                <UpdateInvoice id={invoice.id} />
                <DeleteInvoice id={invoice.id} />
              </div>
            </LinkTd>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

const LinkTd = ({ children, invoiceId }: {children: React.ReactNode, invoiceId: string}) => {
  return (
    <Link href={`/dashboard/invoices/detail/${invoiceId}`}>
      {children}
    </Link>
  )
}
