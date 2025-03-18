
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw, FileBarChart } from "lucide-react";
import { useAuthStore } from '@/store/authStore';
import { reportsApi } from '@/lib/api';
import NavBar from '@/components/NavBar';

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
}

const Reports = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  // Fetch reports data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: reportsApi.getReports,
    retry: 1,
    enabled: isAuthenticated
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view reports');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect via the useEffect
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-20 px-4">
        <div className="container max-w-7xl animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Reports</h1>
              <p className="text-muted-foreground">
                View and download your data reports
              </p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0" 
              onClick={() => refetch()} 
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-sm p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin">
                  <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <p className="mt-4 text-muted-foreground">Loading reports...</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center p-8">
                <p className="text-destructive">Failed to load reports</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => refetch()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <Table>
                <TableCaption>A list of your reports.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileBarChart className="h-4 w-4 text-muted-foreground" />
                        {report.title}
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{formatDate(report.date)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(report.status)}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate(`/reports/${report.id}`)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
