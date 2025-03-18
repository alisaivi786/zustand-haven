
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, FileBarChart, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { reportsApi } from '@/lib/api';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReportDetails = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => reportId ? reportsApi.getReportDetails(reportId) : Promise.reject('No report ID'),
    retry: 1,
    enabled: isAuthenticated && !!reportId
  });
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view report details');
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
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };
  
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-20 px-4">
        <div className="container max-w-5xl animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/reports')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
              <div className="animate-spin">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-4 text-muted-foreground">Loading report details...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
              <p className="text-destructive">Failed to load report details</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => navigate('/reports')}
              >
                Back to Reports
              </Button>
            </div>
          ) : data?.report ? (
            <>
              <div className="mb-8 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileBarChart className="h-6 w-6 text-primary" />
                  <h1 className="text-3xl font-bold">{data.report.title}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Report Type</p>
                    <p className="font-medium">{data.report.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Generated On</p>
                    <p className="font-medium">{formatDate(data.report.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`font-medium ${getStatusColor(data.report.status)}`}>
                      {data.report.status}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(data.report.data).map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base capitalize text-muted-foreground">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {typeof value === 'number' && !key.toLowerCase().includes('rate') && !key.toLowerCase().includes('score')
                          ? value.toLocaleString()
                          : value}
                        {key.toLowerCase().includes('rate') && typeof value === 'number' ? '%' : ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
              <p className="text-muted-foreground">Report not found</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => navigate('/reports')}
              >
                Back to Reports
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ReportDetails;
