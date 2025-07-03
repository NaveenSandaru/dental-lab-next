"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const sampleOrder = {
  patientName: "John Smith",
  patientId: "PAT-12345",
  dentist: "Dr. Sarah Johnson",
  lab: "PrecisionDental Lab",
  workType: "Complete Denture",
  dueDate: "2025-01-22",
  shade: "A2",
  material: "Acrylic",
  priority: "Normal",
  specialInstructions: "Please ensure proper fit and shade matching.",
  checklist: {
    digitalFiles: true,
    intraOralScans: true,
    stlFiles: true,
    cbctScans: false,
    photographs: true,
    impressions: true,
    biteRegistration: false,
    models: true,
    faceBow: false,
    prescription: true,
    clinicalNotes: true,
  },
  files: [
    { name: "scan1.stl", type: "STL" },
    { name: "photo1.jpg", type: "Image" },
    { name: "prescription.pdf", type: "PDF" },
  ],
};

function ChecklistItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {checked ? <CheckCircle className="h-4 w-4 text-green-600" /> : <span className="inline-block w-4 h-4" />}
      <span className={checked ? "text-gray-900" : "text-gray-400 line-through"}>{label}</span>
    </div>
  );
}

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const order = sampleOrder;
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
      <button
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center gap-2"
        onClick={() => router.push('/lab?tab=orders')}
      >
        &#8592; Back to Orders
      </button>
      <h1 className="text-2xl font-bold mb-6">Order Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-xs text-gray-500">Patient Name</div>
          <div className="font-medium text-gray-900">{order.patientName}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Patient ID</div>
          <div className="font-medium text-gray-900">{order.patientId}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Dentist</div>
          <div className="font-medium text-gray-900">{order.dentist}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Lab</div>
          <div className="font-medium text-gray-900">{order.lab}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Work Type</div>
          <div className="font-medium text-gray-900">{order.workType}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Due Date</div>
          <div className="font-medium text-gray-900">{new Date(order.dueDate).toLocaleDateString()}</div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Digital Files & Documents</h2>
      <div className="mb-6 border rounded p-4 bg-gray-50">
        <div className="mb-2 text-sm font-medium text-gray-700">Uploaded Files</div>
        <ul className="mb-2 text-sm">
          {order.files.map((file, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-gray-700">{file.name}</span>
              <span className="text-gray-400 text-xs">({file.type})</span>
            </li>
          ))}
        </ul>
        <div className="text-xs text-gray-500">STL, OBJ, PLY, DICOM, Images, PDF documents</div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Submission Checklist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <div className="font-medium mb-1">Digital Files</div>
          <div className="flex flex-col gap-1">
            <ChecklistItem label="Digital Files" checked={order.checklist.digitalFiles} />
            <ChecklistItem label="intra Oral Scans" checked={order.checklist.intraOralScans} />
            <ChecklistItem label="stl Files" checked={order.checklist.stlFiles} />
            <ChecklistItem label="cbct Scans" checked={order.checklist.cbctScans} />
            <ChecklistItem label="photographs" checked={order.checklist.photographs} />
          </div>
        </div>
        <div>
          <div className="font-medium mb-1">Physical Items</div>
          <div className="flex flex-col gap-1">
            <ChecklistItem label="impressions" checked={order.checklist.impressions} />
            <ChecklistItem label="bite Registration" checked={order.checklist.biteRegistration} />
            <ChecklistItem label="models" checked={order.checklist.models} />
            <ChecklistItem label="face Bow" checked={order.checklist.faceBow} />
          </div>
        </div>
        <div>
          <div className="font-medium mb-1">Documentation</div>
          <div className="flex flex-col gap-1">
            <ChecklistItem label="prescription" checked={order.checklist.prescription} />
            <ChecklistItem label="clinical Notes" checked={order.checklist.clinicalNotes} />
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Clinical Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-xs text-gray-500">Shade Selection</div>
          <div className="font-medium text-gray-900">{order.shade}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Material Type</div>
          <div className="font-medium text-gray-900">{order.material}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Priority</div>
          <div className="font-medium text-gray-900">{order.priority}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Special Instructions</div>
          <div className="font-medium text-gray-900 whitespace-pre-line">{order.specialInstructions}</div>
        </div>
      </div>
    </div>
  );
} 