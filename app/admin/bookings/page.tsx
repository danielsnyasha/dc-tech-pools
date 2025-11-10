"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchBookings = useCallback(async () => {
    try {
      const url =
        filter === "all"
          ? "/api/bookings"
          : `/api/bookings?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Bookings Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage appointment requests and bookings</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="grid gap-6">
        {bookings.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">No bookings found</p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 dark:text-white">{booking.customerName}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {booking.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {booking.phone}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Details</h4>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p>
                        <span className="font-medium">Service:</span> {booking.serviceType}
                      </p>
                      {booking.poolSize && (
                        <p>
                          <span className="font-medium">Pool Size:</span> {booking.poolSize}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Preferred Date:</span>{" "}
                        {new Date(booking.preferredDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Preferred Time:</span> {booking.preferredTime}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div>
                        <p>{booking.address}</p>
                        <p>
                          {booking.city}
                          {booking.postalCode && `, ${booking.postalCode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.message && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Additional Information</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      {booking.message}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {booking.status === "pending" && (
                    <>
                      <Button
                        variant="default"
                        onClick={() => updateStatus(booking.id, "confirmed")}
                      >
                        Confirm Booking
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateStatus(booking.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      variant="secondary"
                      onClick={() => updateStatus(booking.id, "completed")}
                    >
                      Mark as Completed
                    </Button>
                  )}
                  <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    Booked: {new Date(booking.createdAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
