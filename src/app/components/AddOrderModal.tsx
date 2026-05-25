import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    orderNo: 'JF-14051',
    company: '',
    orderRecDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    category: '',
    quantity: '1',
    fromWeight: '',
    toWeight: '',
    melting: '',
    meena: '',
    length: '',
    size: '',
    broadness: '',
    screw: '',
    karigarNotes: '',
    narration1: '',
    narration2: '',
    qc: '',
    sampleWeight: '',
    orderType: '',
    expectedDeliveryDate: '',
    karigarDeliveryDate: '',
    karigar: '',
    orderStage: '',
    totalWeight: '',
    deliveryLocation: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const InputRow = ({ label, name, type = "text", required = false, isSelect = false, options = [] }: any) => (
    <div className="flex items-center gap-4 py-2 border-b border-gray-50/50">
      <label className="w-1/3 text-right text-[13px] font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-2/3">
        {isSelect ? (
          <select
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
            required={required}
          >
            <option value="">{`Select ${label.replace(':', '').trim()}`}</option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={type === 'text' ? `Enter ${label.replace(':', '').trim()}` : ''}
            className={`w-full border border-gray-200 rounded-md px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500 ${name === 'orderNo' || name === 'orderRecDate' ? 'bg-gray-100' : 'bg-white'}`}
            readOnly={name === 'orderNo' || name === 'orderRecDate'}
            required={required}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white shadow-2xl w-full max-w-6xl my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f8f9fa]">
          <h2 className="text-lg font-bold text-gray-800">Custom_order Form</h2>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {/* Left Column */}
            <div className="flex flex-col">
              <InputRow label="Order.No:" name="orderNo" required />
              <InputRow label="Order Rec.Date:" name="orderRecDate" type="date" required />
              <InputRow label="Category:" name="category" isSelect required options={['Bangle', 'Chain', 'Pendant', 'Ring']} />
              <InputRow label="From Weight:" name="fromWeight" required />
              <InputRow label="Melting:" name="melting" isSelect required options={['92', '76', '84']} />
              <InputRow label="Length:" name="length" />
              <InputRow label="Broadness:" name="broadness" />
              <InputRow label="Karigar Notes:" name="karigarNotes" />
              <InputRow label="Narration 2:" name="narration2" />
              <InputRow label="Sample Weight:" name="sampleWeight" />
              <InputRow label="Expected Delivery Date:" name="expectedDeliveryDate" type="date" />
              <InputRow label="Karigar:" name="karigar" isSelect required options={['John Doe', 'Jane Smith', 'Ramesh']} />
              <InputRow label="Total Weight:" name="totalWeight" required />
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              <InputRow label="Company:" name="company" isSelect required options={['AT Jewellers', 'Other']} />
              <InputRow label="Delivery Date:" name="deliveryDate" type="date" required />
              <InputRow label="Quantity:" name="quantity" required />
              <InputRow label="To Weight:" name="toWeight" required />
              <InputRow label="Meena:" name="meena" isSelect required options={['Yes', 'No']} />
              <InputRow label="Size:" name="size" />
              <InputRow label="Screw:" name="screw" isSelect options={['Yes', 'No']} />
              <InputRow label="Narration 1:" name="narration1" />
              <InputRow label="QC:" name="qc" />
              <InputRow label="Order Type:" name="orderType" isSelect required options={['Custom', 'Stock']} />
              <InputRow label="Karigar Delivery Date:" name="karigarDeliveryDate" type="date" required />
              <InputRow label="Order Stage:" name="orderStage" isSelect required options={['New', 'Processing', 'QC']} />
              <InputRow label="Delivery Location:" name="deliveryLocation" isSelect required options={['Mumbai', 'Delhi', 'Surat']} />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 flex items-center gap-2 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
};
