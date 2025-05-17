'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { ActionResponse, PatientInvoices } from '@/types/types';
import { getPatientSpecificInvoice } from '@/utils/api';
import { Spinner } from '../Spinner';
import { format } from 'date-fns';

// Use dynamic import with SSR disabled for PDF components
const PDFDownloadLinkNoSSR = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

// PDF document styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5563',
  },
  section: {
    marginBottom: 10,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  billingColumn: {
    flexDirection: 'column',
    width: '48%',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  table: {
    marginVertical: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
    fontSize: 10,
  },
  tableCol1: { width: '40%' },
  tableCol2: { width: '20%' },
  tableCol3: { width: '20%' },
  tableCol4: { width: '20%', textAlign: 'right' },
  totalsSection: {
    marginLeft: 'auto',
    width: '30%',
    marginTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  totalFinalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 5,
    fontWeight: 'bold',
  },
  paymentSection: {
    marginTop: 15,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
  },
});

// PDF Document component
const InvoicePDF = ({ data}: { data: PatientInvoices }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.subtitle}>Order Reference: {data.id}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.sectionTitle}>Detaire</Text>
          <Text style={styles.text}>123 Commerce St, Dhaka, Bangladesh</Text>
          <Text style={styles.text}>support@detaire.com</Text>
        </View>
      </View>

      {/* Billing Section */}
      <View style={styles.billingSection}>
        <View style={styles.billingColumn}>
          <Text style={styles.sectionTitle}>Billed To</Text>
          <Text style={styles.text}>{data.appointment.patient.name}</Text>
          <Text style={styles.text}>123 Main Street, Dhaka, Bangladesh</Text>
          <Text style={styles.text}>City: Dhaka, Bangladesh</Text>
          <Text style={styles.text}>Postal Code: 12545</Text>
        </View>
        <View style={styles.billingColumn}>
          <Text style={styles.text}>Invoice Date: {data?.createdAt ? format(data?.createdAt, "PPP") : new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Transaction Date: {data?.paidAt ? format(data?.paidAt, "PPP") : new Date().toLocaleDateString()}</Text>
          <Text style={styles.text}>Payment Status: {data.status}</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol1}>Service</Text>
          <Text style={styles.tableCol2}>Duration</Text>
          <Text style={styles.tableCol3}>Date</Text>
          <Text style={styles.tableCol4}>Total</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>{data?.appointment.service.name}</Text>
          <Text style={styles.tableCol2}>{data?.appointment.service.duration}</Text>
          <Text style={styles.tableCol3}>{data?.appointment.startTime ? format(data?.appointment.startTime, "PPP") : new Date().toLocaleDateString()}</Text>
          <Text style={styles.tableCol4}>{data?.appointment.service.price} $</Text>
        </View>
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{data?.appointment.service.price} $</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.text}>Tax (0%)</Text>
          <Text style={styles.text}>0.00 BDT</Text>
        </View>
        <View style={styles.totalFinalRow}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.text}>{data?.appointment.service.price} $</Text>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.billingSection}>
          <View style={styles.billingColumn}>
            <Text style={styles.text}>Transaction ID: 8a4eb0b8e8</Text>
            <Text style={styles.text}>Amount Paid: {data?.appointment.service.price} $</Text>
            <Text style={styles.text}>Payment Method: visa</Text>
          </View>
          <View style={styles.billingColumn}>
            <Text style={styles.text}>Bank Transaction ID: 25032714513xgFujK4vGnx8zDD</Text>
            <Text style={styles.text}>Transaction Date: {data?.paidAt ? format(data?.paidAt, "PPP") : new Date().toLocaleDateString()}</Text>
            <Text style={styles.text}>Payment Status: {data.status}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.text}>Thank you for your purchase!</Text>
        <Text style={styles.text}>If you have any questions, contact us at support@dentaire.com</Text>
      </View>
    </Page>
  </Document>
);

export default function InvoicePageDisplay({ InvoiceId }: { InvoiceId: string }) {

  const { data, isLoading, isFetched } = useQuery<ActionResponse<PatientInvoices>>({
    queryKey: ['invoice-details', InvoiceId],
    queryFn: () => getPatientSpecificInvoice(InvoiceId)
  })



  if (isLoading) {
    return (
      <div className="container min-h-[80vh] space-y-4 flex items-center justify-center">
        <Spinner className="w-16 h-16" variant="primary" />
      </div>
    )
  }


  // Invoice data
  const invoiceData = data?.data



  const handlePrint = () => {
    window.print();
  };

  // Don't render until component is mounted (client-side)
  if (!isFetched) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full space-y-8">
        {/* Invoice Box */}
        <div className="invoice-box bg-white p-4 md:p-8 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 md:pb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoice</h1>
              <p className="text-gray-600">Order Reference: { invoiceData?.id }</p>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Dentaire</h2>
              <p className="text-gray-600">123 Commerce St, Dhaka, Bangladesh</p>
              <p className="text-gray-600">support@yourstore.com</p>
            </div>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Billed To</h3>
              <p className="text-gray-600">{invoiceData?.appointment.patient.name}</p>
              <p className="text-gray-600">123 Main Street, Dhaka, Bangladesh</p>
              <p className="text-gray-600">City: Dhaka, Bangladesh</p>
              <p className="text-gray-600">Postal Code: 12543</p>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-gray-600">Invoice Date: {invoiceData?.createdAt ? format(invoiceData?.createdAt, "PPP") : new Date().toLocaleDateString()}</p>
              <p className="text-gray-600">Transaction Date: {invoiceData?.paidAt ? format(invoiceData?.paidAt, "PPP") : new Date().toLocaleDateString()}</p>
              <p className="text-gray-600">Payment Status: <span className="font-medium">{invoiceData?.status}</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-4 md:mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-2 md:px-4 font-semibold text-gray-900 text-sm md:text-base">Service</th>
                    <th className="py-2 px-2 md:px-4 font-semibold text-gray-900 text-sm md:text-base">Duration</th>
                    <th className="py-2 px-2 md:px-4 font-semibold text-gray-900 text-sm md:text-base">Date</th>
                    <th className="py-2 px-2 md:px-4 font-semibold text-gray-900 text-right text-sm md:text-base">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{invoiceData?.appointment.service.name}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{invoiceData?.appointment.service.duration}</td>
                    <td className="py-2 px-2 md:px-4 text-sm md:text-base">{invoiceData?.appointment.startTime ? format(invoiceData?.appointment.startTime, "PPP") : new Date().toLocaleDateString()}</td>
                    <td className="py-2 px-2 md:px-4 text-right text-sm md:text-base">{invoiceData?.appointment.service.price} $</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="mt-4 md:mt-6 flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{invoiceData?.appointment.service.price} $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (0%)</span>
                  <span>0.00 BDT</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{invoiceData?.appointment.service.price} $</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-4 md:mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
              <div>
                <p>Transaction ID: 8a4eb0b8e8</p>
                <p>Amount Paid: {invoiceData?.appointment.service.price} $</p>
                <p>Payment Method: visa</p>
              </div>
              <div>
                <p>Bank Transaction ID: 25032714513xgFujK4vGnx8zDD</p>
                <p>Transaction Date: {invoiceData?.paidAt ? format(invoiceData?.paidAt, "PPP") : new Date().toLocaleDateString()}</p>
                <p>Payment Status: <span className="font-medium">{invoiceData?.status}</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 md:mt-6 text-center text-gray-600">
            <p>Thank you for your purchase!</p>
            <p>If you have any questions, contact us at support@yourstore.com</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
          <button
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Print Invoice
          </button>
          {isFetched && invoiceData && (
            <PDFDownloadLinkNoSSR
              document={<InvoicePDF data={invoiceData as PatientInvoices} />}
              fileName={`invoice-${invoiceData?.id}.pdf`}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300 text-center"
            >
              {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
            </PDFDownloadLinkNoSSR>
          )}
        </div>
      </div>
    </div>
  );
}