"use client";

import React, { useState } from 'react';
import { Package, Edit, Eye, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const LAB_NAME = 'PrecisionDental Lab';
const LAB_PROFILE = {
  name: 'PrecisionDental Lab',
  contact: 'James Wilson',
  phone: '+1-555-0123',
  email: 'orders@precisiondental.com',
  address: '123 Lab Street, City, State 12345',
  specialties: ['Complete Dentures', 'Partial Dentures', 'Relines'],
};

type Stage = {
  name: string;
  completed: boolean;
  date: string | null;
  timestamp: string | null;
};

type Order = {
  id: string;
  patientName: string;
  patientId: string;
  dentist: string;
  labName: string;
  workType: string;
  status: string;
  orderDate: string;
  dueDate: string;
  priority: string;
  cost: number;
  notes: string;
  stages: Stage[];
};

const initialOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    patientName: 'John Smith',
    patientId: 'PAT-12345',
    dentist: 'Dr. Sarah Johnson',
    labName: 'PrecisionDental Lab',
    workType: 'Complete Denture',
    status: 'In Progress',
    orderDate: '2025-01-15',
    dueDate: '2025-01-22',
    priority: 'Normal',
    cost: 450.0,
    notes: 'Upper complete denture, standard shade A2',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-15', timestamp: '2025-01-15T09:30:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-18', timestamp: '2025-01-18T14:15:00' },
      { name: 'Final Processing', completed: false, date: null, timestamp: null },
      { name: 'Quality Check', completed: false, date: null, timestamp: null },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  },
  {
    id: 'ORD-2025-002',
    patientName: 'Mary Davis',
    patientId: 'PAT-12346',
    dentist: 'Dr. Michael Chen',
    labName: 'PrecisionDental Lab',
    workType: 'Crown & Bridge',
    status: 'Ready for Pickup',
    orderDate: '2025-01-10',
    dueDate: '2025-01-17',
    priority: 'High',
    cost: 320.0,
    notes: 'PFM crown #14, shade B1',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-10', timestamp: '2025-01-10T08:45:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-13', timestamp: '2025-01-13T11:20:00' },
      { name: 'Final Processing', completed: true, date: '2025-01-16', timestamp: '2025-01-16T16:30:00' },
      { name: 'Quality Check', completed: true, date: '2025-01-17', timestamp: '2025-01-17T10:15:00' },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  },
  {
    id: 'ORD-2025-003',
    patientName: 'Alex Turner',
    patientId: 'PAT-12347',
    dentist: 'Dr. Emily Wilson',
    labName: 'PrecisionDental Lab',
    workType: 'Implant Restoration',
    status: 'Ready for Pickup',
    orderDate: '2025-01-05',
    dueDate: '2025-01-12',
    priority: 'Normal',
    cost: 800.0,
    notes: 'Implant abutment, shade C1',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-05', timestamp: '2025-01-05T13:00:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-07', timestamp: '2025-01-07T09:45:00' },
      { name: 'Final Processing', completed: true, date: '2025-01-10', timestamp: '2025-01-10T15:20:00' },
      { name: 'Quality Check', completed: true, date: '2025-01-12', timestamp: '2025-01-12T12:30:00' },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  },
  {
    id: 'ORD-2025-004',
    patientName: 'Linda Brown',
    patientId: 'PAT-12348',
    dentist: 'Dr. Sarah Johnson',
    labName: 'PrecisionDental Lab',
    workType: 'Partial Denture',
    status: 'Delayed',
    orderDate: '2025-01-01',
    dueDate: '2025-01-08',
    priority: 'High',
    cost: 600.0,
    notes: 'Lower partial, patient allergic to nickel',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-01', timestamp: '2025-01-01T07:30:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-03', timestamp: '2025-01-03T14:45:00' },
      { name: 'Final Processing', completed: true, date: '2025-01-07', timestamp: '2025-01-07T11:15:00' },
      { name: 'Quality Check', completed: true, date: '2025-01-09', timestamp: '2025-01-09T16:00:00' },
      { name: 'Delivery', completed: true, date: '2025-01-10', timestamp: '2025-01-10T08:20:00' }
    ]
  },
  {
    id: 'ORD-2025-005',
    patientName: 'Robert Wilson',
    patientId: 'PAT-12349',
    dentist: 'Dr. Michael Chen',
    labName: 'PrecisionDental Lab',
    workType: 'Veneers',
    status: 'In Progress',
    orderDate: '2025-01-20',
    dueDate: '2025-01-27',
    priority: 'High',
    cost: 1200.0,
    notes: 'Porcelain veneers #8-11, shade A1',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-20', timestamp: '2025-01-20T10:15:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-22', timestamp: '2025-01-22T15:30:00' },
      { name: 'Final Processing', completed: false, date: null, timestamp: null },
      { name: 'Quality Check', completed: false, date: null, timestamp: null },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  },
  {
    id: 'ORD-2025-006',
    patientName: 'Jennifer Martinez',
    patientId: 'PAT-12350',
    dentist: 'Dr. Emily Wilson',
    labName: 'PrecisionDental Lab',
    workType: 'Night Guard',
    status: 'Ready for Pickup',
    orderDate: '2025-01-18',
    dueDate: '2025-01-25',
    priority: 'Normal',
    cost: 180.0,
    notes: 'Custom night guard, soft material',
    stages: [
      { name: 'Impression Received', completed: true, date: '2025-01-18', timestamp: '2025-01-18T09:00:00' },
      { name: 'Wax Try-in', completed: true, date: '2025-01-20', timestamp: '2025-01-20T13:45:00' },
      { name: 'Final Processing', completed: true, date: '2025-01-23', timestamp: '2025-01-23T11:20:00' },
      { name: 'Quality Check', completed: true, date: '2025-01-24', timestamp: '2025-01-24T14:10:00' },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  },
  {
    id: 'ORD-2025-007',
    patientName: 'David Thompson',
    patientId: 'PAT-12351',
    dentist: 'Dr. Sarah Johnson',
    labName: 'PrecisionDental Lab',
    workType: 'Full Arch Implant',
    status: 'Pending',
    orderDate: '2025-01-25',
    dueDate: '2025-02-01',
    priority: 'High',
    cost: 2500.0,
    notes: 'Full arch implant restoration, titanium framework',
    stages: [
      { name: 'Impression Received', completed: false, date: null, timestamp: null },
      { name: 'Wax Try-in', completed: false, date: null, timestamp: null },
      { name: 'Final Processing', completed: false, date: null, timestamp: null },
      { name: 'Quality Check', completed: false, date: null, timestamp: null },
      { name: 'Delivery', completed: false, date: null, timestamp: null }
    ]
  }
];

export default function LabPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [profile, setProfile] = useState(LAB_PROFILE);
  const [searchTerm, setSearchTerm] = useState("");

  // Only show orders for this lab
  const labOrders = orders.filter((order: Order) => order.labName === LAB_NAME);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders =>
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getAutoStatus = (order: Order): string => {
    const now = new Date();
    const dueDate = new Date(order.dueDate);
    // Find the latest checked stage and its date
    let status = order.status;
    const impression = order.stages.find(s => s.name === 'Impression Received');
    const quality = order.stages.find(s => s.name === 'Quality Check');
    const delivery = order.stages.find(s => s.name === 'Delivery');
    // If any checked stage date is after due date, status is Delayed
    if (order.stages.some(s => s.completed && s.date && new Date(s.date) > dueDate)) {
      status = 'Delayed';
    } else if (delivery && delivery.completed) {
      status = 'Completed';
    } else if (quality && quality.completed) {
      status = 'Ready for Pickup';
    } else if (impression && impression.completed) {
      status = 'In Progress';
    } else {
      status = 'Pending';
    }
    return status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-bold';
      case 'Normal': return 'text-green-600 font-bold';
      case 'Low': return 'text-gray-600 font-bold';
      default: return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return null;
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timestamp;
    }
  };

  const Dashboard = () => {
    const stats = [
      { title: 'Active Orders', value: labOrders.filter(o => o.status !== 'Completed').length, color: 'bg-blue-500' },
      { title: 'Completed', value: labOrders.filter(o => o.status === 'Completed').length, color: 'bg-green-500' },
      { title: 'Overdue', value: labOrders.filter(o => new Date(o.dueDate) < new Date() && o.status !== 'Completed').length, color: 'bg-red-500' },
      { title: 'Total Orders', value: labOrders.length, color: 'bg-purple-500' }
    ];
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}><Package className="h-6 w-6 text-white" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OrdersTab = () => {
    // Filter orders by search term
    const filteredOrders = labOrders.filter(order => {
      const term = searchTerm.toLowerCase();
      return (
        order.patientName.toLowerCase().includes(term) ||
        order.patientId.toLowerCase().includes(term) ||
        order.dentist.toLowerCase().includes(term)
      );
    });
    return (
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Received Orders</h2>
            {/* Optionally, you could add a New Order button here for labs */}
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <div className="min-w-[1100px]">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">No orders for this lab.</td>
                  </tr>
                )}
                {filteredOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr
                      className={`hover:bg-gray-50 cursor-pointer ${selectedOrder && selectedOrder.id === order.id ? 'bg-gray-100' : ''}`}
                      onClick={e => {
                        // Prevent expand/collapse if eye icon is clicked
                        if ((e.target as HTMLElement).closest('.order-eye-action')) return;
                        setSelectedOrder(selectedOrder && selectedOrder.id === order.id ? null : order);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.patientName}</div>
                          <div className="text-sm text-gray-500">{order.patientId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.workType}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPriorityColor(order.priority)}`}>{order.priority}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getAutoStatus(order) === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          getAutoStatus(order) === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          getAutoStatus(order) === 'Ready for Pickup' ? 'bg-green-100 text-green-800' :
                          getAutoStatus(order) === 'Completed' ? 'bg-gray-100 text-gray-800' :
                          getAutoStatus(order) === 'Delayed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getAutoStatus(order)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="order-eye-action text-gray-600 hover:text-blue-600"
                          title="View order details"
                          onClick={e => {
                            e.stopPropagation();
                            router.push(`/lab/order/${order.id}`);
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                    {selectedOrder && selectedOrder.id === order.id && (
                      <tr>
                        <td colSpan={7} className="bg-gray-50 px-6 py-6">
                          {/* Patient Information */}
                          <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Information</h3>
                            <div className="space-y-1">
                              <p><span className="font-medium">Name:</span> {order.patientName}</p>
                              <p><span className="font-medium">Patient ID:</span> {order.patientId}</p>
                              <p><span className="font-medium">Dentist:</span> {order.dentist}</p>
                            </div>
                          </div>
                          {/* Order Information */}
                          <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Order Information</h3>
                            <div className="space-y-1">
                              <p><span className="font-medium">Work Type:</span> {order.workType}</p>
                              <p><span className="font-medium">Lab:</span> {order.labName}</p>
                              <p><span className="font-medium">Order Date:</span> {order.orderDate}</p>
                              <p><span className="font-medium">Due Date:</span> {order.dueDate}</p>
                              <p><span className="font-medium">Priority:</span> <span className={`${getPriorityColor(order.priority)}`}>{order.priority}</span></p>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Cost:</span>
                                <input
                                  type="number"
                                  value={order.cost}
                                  onChange={e => {
                                    const newCost = parseFloat(e.target.value);
                                    setOrders(orders => orders.map(o =>
                                      o.id === order.id ? { ...o, cost: newCost } : o
                                    ));
                                    setSelectedOrder({ ...order, cost: newCost });
                                  }}
                                  className="border border-gray-300 rounded px-2 py-1 w-24"
                                />
                              </div>
                            </div>
                          </div>
                          {/* Progress Tracking */}
                          <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Progress Tracking</h3>
                            <div className="space-y-3">
                              {order.stages.map((stage, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <input
                                    type="checkbox"
                                    checked={stage.completed}
                                    onChange={e => {
                                      const now = new Date();
                                      const dateString = now.toISOString().split('T')[0];
                                      const timestampString = now.toISOString();
                                      const updatedStages = order.stages.map((s, i) =>
                                        i === idx
                                          ? {
                                              ...s,
                                              completed: e.target.checked,
                                              date: e.target.checked ? dateString : null,
                                              timestamp: e.target.checked ? timestampString : null
                                            }
                                          : s
                                      );
                                      // Compute new status
                                      const tempOrder = { ...order, stages: updatedStages };
                                      const newStatus = getAutoStatus(tempOrder);
                                      setOrders(orders => orders.map(o =>
                                        o.id === order.id ? { ...o, stages: updatedStages, status: newStatus } : o
                                      ));
                                      setSelectedOrder({ ...order, stages: updatedStages, status: newStatus });
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <div className={`w-4 h-4 rounded-full ${stage.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                  <span className={`${stage.completed ? 'text-gray-900 font-medium' : 'text-gray-500'} flex-1`}>{stage.name}</span>
                                  {stage.completed && (
                                    <span className="ml-2 text-sm text-gray-500 min-w-[90px] text-right">{stage.date}</span>
                                  )}
                                  {stage.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Clock className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Notes */}
                          {order.notes && (
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                              <p className="text-gray-700 bg-gray-50 p-3 rounded">{order.notes}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ProfileTab = () => (
    <div className="bg-white rounded-lg shadow mt-6 p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Lab Profile</h2>
      <div className="space-y-2">
        <div><span className="font-medium">Lab Name:</span> {profile.name}</div>
        <div><span className="font-medium">Contact:</span> {profile.contact}</div>
        <div><span className="font-medium">Phone:</span> {profile.phone}</div>
        <div><span className="font-medium">Email:</span> {profile.email}</div>
        <div><span className="font-medium">Address:</span> {profile.address}</div>
        <div><span className="font-medium">Specialties:</span> {profile.specialties.join(', ')}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lab Center: {LAB_NAME}</h1>
              <p className="mt-1 text-sm text-gray-500">Manage and update your laboratory orders</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'orders', label: 'Orders' },
              { key: 'profile', label: 'Profile' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
} 