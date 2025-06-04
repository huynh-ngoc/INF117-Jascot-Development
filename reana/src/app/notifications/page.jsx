"use client"

import React, { useState } from 'react';
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import DarkLightSwitch from "@/components/mode-toggle/dark-light-switch";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  Settings,
  Mail,
  Smartphone,
  Monitor,
  Check,
  X,
  Archive,
  MoreVertical,
  AlertCircle,
  TrendingUp,
  FileText,
  DollarSign,
  Users,
  Calendar,
  Trash2,
  MailOpen
} from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'report',
      title: 'Property Analysis Complete',
      message: 'Your analysis for 123 Main St has been completed and is ready for review.',
      time: '2 minutes ago',
      read: false,
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      priority: 'normal'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Market Alert',
      message: 'Property values in Downtown area have increased by 15% this month.',
      time: '1 hour ago',
      read: false,
      icon: <TrendingUp className="h-5 w-5 text-yellow-600" />,
      priority: 'high'
    },
    {
      id: 3,
      type: 'billing',
      title: 'Payment Successful',
      message: 'Your monthly subscription payment of $12.95 has been processed.',
      time: '3 hours ago',
      read: true,
      icon: <DollarSign className="h-5 w-5 text-gray-500" />,
      priority: 'normal'
    },
    {
      id: 4,
      type: 'system',
      title: 'Scheduled Maintenance',
      message: 'System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST.',
      time: '6 hours ago',
      read: true,
      icon: <Settings className="h-5 w-5 text-yellow-600" />,
      priority: 'low'
    },
    {
      id: 5,
      type: 'team',
      title: 'New Team Member Added',
      message: 'Sarah Johnson has been added to your team workspace.',
      time: '1 day ago',
      read: false,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      priority: 'normal'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Meeting Reminder',
      message: 'You have a client meeting scheduled for tomorrow at 2:00 PM.',
      time: '1 day ago',
      read: true,
      icon: <Calendar className="h-5 w-5 text-gray-500" />,
      priority: 'normal'
    }
  ]);

  const [settings, setSettings] = useState({
    email: {
      reports: true,
      alerts: true,
      billing: true,
      marketing: false
    },
    push: {
      reports: true,
      alerts: true,
      billing: false,
      marketing: false
    },
    inApp: {
      reports: true,
      alerts: true,
      billing: true,
      marketing: true
    }
  });

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'report', label: 'Reports', count: notifications.filter(n => n.type === 'report').length },
    { value: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length },
    { value: 'billing', label: 'Billing', count: notifications.filter(n => n.type === 'billing').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const updateSettings = (category, type, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-yellow-600';
      case 'normal': return 'border-l-blue-600';
      case 'low': return 'border-l-gray-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Notifications</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-8">
            <DarkLightSwitch className="place-content-center" />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                <p className="text-gray-600">Stay updated with your property analysis and account activity</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Notification Filters */}
              <div className="lg:col-span-1">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Filter</h3>
                  <div className="space-y-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          filter === option.value 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          filter === option.value 
                            ? 'bg-blue-200 text-blue-800' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-4 mt-4">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unread</span>
                      <span className="font-medium text-blue-600">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Notifications List */}
              <div className="lg:col-span-3">
                <Card className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                      <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                  {!notification.read && (
                                    <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                              </div>
                              <div className="flex items-center gap-1 ml-4">
                                {!notification.read ? (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsUnread(notification.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <MailOpen className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Card>
              </div>
            </div>

            {/* Notification Settings */}
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                <p className="text-gray-600 mt-1">Choose how you want to receive notifications</p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Notification Type</th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-gray-900">Email</span>
                          </div>
                        </th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Smartphone className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium text-gray-900">Push</span>
                          </div>
                        </th>
                        <th className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Monitor className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900">In-App</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">Property Reports</p>
                            <p className="text-sm text-gray-600">Analysis completion notifications</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.email.reports}
                            onChange={(e) => updateSettings('email', 'reports', e.target.checked)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.push.reports}
                            onChange={(e) => updateSettings('push', 'reports', e.target.checked)}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.inApp.reports}
                            onChange={(e) => updateSettings('inApp', 'reports', e.target.checked)}
                            className="w-4 h-4 text-gray-500 focus:ring-gray-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">Market Alerts</p>
                            <p className="text-sm text-gray-600">Property value changes and market updates</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.email.alerts}
                            onChange={(e) => updateSettings('email', 'alerts', e.target.checked)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.push.alerts}
                            onChange={(e) => updateSettings('push', 'alerts', e.target.checked)}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.inApp.alerts}
                            onChange={(e) => updateSettings('inApp', 'alerts', e.target.checked)}
                            className="w-4 h-4 text-gray-500 focus:ring-gray-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">Billing & Account</p>
                            <p className="text-sm text-gray-600">Payment confirmations and account updates</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.email.billing}
                            onChange={(e) => updateSettings('email', 'billing', e.target.checked)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.push.billing}
                            onChange={(e) => updateSettings('push', 'billing', e.target.checked)}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.inApp.billing}
                            onChange={(e) => updateSettings('inApp', 'billing', e.target.checked)}
                            className="w-4 h-4 text-gray-500 focus:ring-gray-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">Marketing & Updates</p>
                            <p className="text-sm text-gray-600">Product updates and promotional content</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.email.marketing}
                            onChange={(e) => updateSettings('email', 'marketing', e.target.checked)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.push.marketing}
                            onChange={(e) => updateSettings('push', 'marketing', e.target.checked)}
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={settings.inApp.marketing}
                            onChange={(e) => updateSettings('inApp', 'marketing', e.target.checked)}
                            className="w-4 h-4 text-gray-500 focus:ring-gray-500 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Notification Guidelines */}
            <Card className="bg-gradient-to-br from-yellow-50 via-blue-50 to-gray-50 border-2 border-blue-200">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Guidelines</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>High Priority:</strong> Market alerts, urgent account issues, and time-sensitive reports</p>
                      <p><strong>Normal Priority:</strong> Completed analyses, team updates, and regular account activity</p>
                      <p><strong>Low Priority:</strong> System maintenance, feature announcements, and optional updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}