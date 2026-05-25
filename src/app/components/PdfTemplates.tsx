import React from 'react';
import { subDays, format } from 'date-fns';

export const PdfTemplates = ({ order, id, type }: { order: any, id: string, type: 'karigar' | 'customer' }) => {
  if (!order) return null;

  let displayDeliveryDate = order.deliveryDate;
  if (type === 'karigar' && order.deliveryDate) {
    try {
      const d = new Date(order.deliveryDate);
      if (!isNaN(d.getTime())) {
        displayDeliveryDate = format(subDays(d, 3), 'do MMM, yyyy');
      }
    } catch (e) {}
  }

  return (
    <div 
      id={id} 
      style={{
        position: 'absolute',
        top: '-10000px', // Hide from view
        left: '-10000px',
        width: '800px',
        backgroundColor: '#fff',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
        zIndex: -1000
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '20px' }}>
        {/* Placeholder for Logo */}
        <div style={{ width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#d4af37', lineHeight: 1 }}>JF</div>
          <div style={{ fontSize: '10px', color: '#d4af37', marginTop: '4px' }}>JEWEL FACTORY</div>
        </div>
      </div>

      <div style={{ border: '1px solid #e5e7eb', padding: '20px' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Order #{order.orderNumber}</h1>
            {type === 'karigar' ? (
              <>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>{order.karigarName || 'SKA'}</div>
                <div style={{ fontSize: '14px' }}>City : {order.deliveryLocation || 'raipur'}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>{order.customerName || 'ATW ADITYA JEW'}</div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>Mobile Number : {order.mobile || '9340643259'}</div>
                <div style={{ fontSize: '14px', marginBottom: '4px' }}>City : {order.city || 'Jagdalpur'}</div>
                <div style={{ fontSize: '14px' }}>Delivery Location : {order.deliveryLocation || 'raipur'}</div>
              </>
            )}
          </div>
          <div>
            <div style={{ border: '1px solid #d1d5db', color: '#ef4444', padding: '0px 4px', fontSize: '12px' }}>×</div>
          </div>
        </div>

        {/* Data Tables */}
        <style>{`
          .pdf-table {
            width: 100%;
            border-collapse: collapse;
          }
          .pdf-table th, .pdf-table td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
            font-size: 14px;
          }
          .pdf-table th {
            font-weight: normal;
            color: #4b5563;
          }
          .pdf-table td {
            font-weight: bold;
          }
        `}</style>

        <table className="pdf-table">
          <tbody>
            <tr>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Melting</th>
            </tr>
            <tr>
              <td>{order.orderDate}</td>
              <td>{displayDeliveryDate}</td>
              <td>{order.categoryName}</td>
              <td>{order.totalQuantity} PCS</td>
              <td>{order.melting}</td>
            </tr>
          </tbody>
        </table>

        <table className="pdf-table" style={{ borderTop: 'none' }}>
          <tbody>
            <tr>
              <th style={{ width: '20%' }}>Length</th>
              <th style={{ width: '20%' }}>Size</th>
              <th style={{ width: '40%' }}>Broadness</th>
              <th style={{ width: '20%' }}>Screw</th>
            </tr>
            <tr>
              <td style={{ height: '40px' }}>{order.length || ''}</td>
              <td>{order.size || '2.3 AANA'}</td>
              <td>{order.broadness || 'AS PER WEIGHT'}</td>
              <td>{order.screw || ''}</td>
            </tr>
          </tbody>
        </table>

        <table className="pdf-table" style={{ borderTop: 'none', marginBottom: '16px' }}>
          <tbody>
            <tr>
              <th style={{ width: '20%' }}>Wt</th>
              <th style={{ width: '20%' }}>Meena</th>
              <th style={{ width: '30%' }}>QC</th>
              <th style={{ width: '30%' }}>Order Ref</th>
            </tr>
            <tr>
              <td style={{ height: '40px' }}>{order.weight || '24 -25 gm'}</td>
              <td>{order.meena || 'No'}</td>
              <td>{order.qc || ''}</td>
              <td>{order.orderRef || ''}</td>
            </tr>
          </tbody>
        </table>

        {/* Specifications */}
        <table className="pdf-table" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr>
              <th style={{ width: '50%' }}>Product Specifications</th>
              <th style={{ width: '50%' }}>General Specifications</th>
            </tr>
            <tr>
              <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                <div style={{ marginBottom: '4px' }}>1. Order Stage : {order.orderStage || 'in_process'}</div>
                <div style={{ marginBottom: '4px' }}>2. Order Type : {order.orderType || 'Customer order'}</div>
                <div style={{ marginBottom: '4px' }}>3. Narration 1 : {order.narration1 || 'SAME AS PER DESIGN BANEGA BANGLES (1PAIR)'}</div>
                <div>4. Narration 2 : {order.narration2 || 'UNDER 25 GRAMS'}</div>
              </td>
              <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                <div style={{ marginBottom: '8px' }}>1. Sample Weight : {order.sampleWeight || ''}</div>
                <div>2. Total Weight : {order.totalWeight || '25'}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Image */}
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '160px', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {/* Placeholder for actual image */}
             <div style={{ color: '#fff', fontSize: '12px' }}>Product Image</div>
          </div>
          <div style={{ marginTop: '8px', fontSize: '14px' }}>1 / 1</div>
        </div>
      </div>
    </div>
  );
};
