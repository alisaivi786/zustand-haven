
// Sample report data to simulate API response
export const MOCK_REPORTS = [
  {
    id: '1',
    title: 'Monthly Sales Report',
    date: '2023-10-15',
    type: 'Sales',
    status: 'Completed',
    data: {
      totalSales: 12850,
      totalOrders: 345,
      averageOrderValue: 37.24,
      topProduct: 'Premium Subscription'
    }
  },
  {
    id: '2',
    title: 'Customer Acquisition',
    date: '2023-10-10',
    type: 'Marketing',
    status: 'Completed',
    data: {
      newCustomers: 127,
      conversionRate: 3.2,
      costPerAcquisition: 24.15,
      topChannel: 'Organic Search'
    }
  },
  {
    id: '3',
    title: 'Inventory Status',
    date: '2023-10-14',
    type: 'Inventory',
    status: 'Pending',
    data: {
      totalItems: 1253,
      lowStockItems: 32,
      outOfStockItems: 15,
      restockValue: 4350
    }
  },
  {
    id: '4',
    title: 'Website Performance',
    date: '2023-10-12',
    type: 'Technical',
    status: 'Completed',
    data: {
      averageLoadTime: 1.2,
      bounceRate: 28.5,
      mobileUsers: 68.3,
      desktopUsers: 31.7
    }
  },
  {
    id: '5',
    title: 'Customer Satisfaction',
    date: '2023-10-08',
    type: 'Customer',
    status: 'Completed',
    data: {
      overallRating: 4.2,
      responseRate: 18.5,
      issuesResolved: 95.3,
      netPromoterScore: 42
    }
  }
];
