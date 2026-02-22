'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Star,
} from 'lucide-react';

import { fetchOrders, Order } from '@/lib/api/orders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        console.log("data",data);
        
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const normalizeStatus = (status: string) => {
    if (status === 'paid') return 'processing';
    return status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const status = normalizeStatus(order.status);
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all' || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    processing: orders.filter(o => o.status === 'paid').length,
    pending: orders.filter(o => o.status === 'created').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(orderStats).map(([key, value]) => (
            <Card key={key}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-gray-600 capitalize">{key}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search orders or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders */}
        {loading ? (
          <p className="text-center py-10">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => {
              const status = normalizeStatus(order.status);

              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{order.id.toUpperCase()}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(status)} flex gap-1`}>
                        {getStatusIcon(status)}
                        {status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {order.items.map(item => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-center mb-3 bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="w-16 h-16 relative rounded overflow-hidden bg-white">
                          <Image
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <p className="font-semibold">
                        Total: ₹{order.total.toFixed(2)}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>

                        {status === 'delivered' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        )}

                        {order.tracking && (
                          <Button size="sm">
                            <Truck className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
