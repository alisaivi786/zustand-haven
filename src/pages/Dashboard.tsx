
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import NavBar from '@/components/NavBar';
import Button from '@/components/Button';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view the dashboard');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect via the useEffect
  }
  
  return (
    <>
      <NavBar />
      <main className="pt-28 pb-20 px-4">
        <div className="container max-w-5xl animate-fade-in">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Welcome to your personalized dashboard. View and manage your content and settings.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Stats Cards */}
            {[
              { title: 'Total Projects', value: '12', change: '+2', up: true },
              { title: 'Active Tasks', value: '8', change: '-1', up: false },
              { title: 'Completion Rate', value: '67%', change: '+5%', up: true }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-xl shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className={`text-sm font-medium flex items-center ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`ml-1 ${stat.up ? '' : 'rotate-180'}`}
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: 'Project created', time: '2 hours ago', project: 'Website Redesign' },
                    { action: 'Task completed', time: 'Yesterday', project: 'API Integration' },
                    { action: 'Comment added', time: '3 days ago', project: 'Mobile App' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="ml-4">
                        <p className="font-medium">{activity.action}</p>
                        <div className="flex text-sm text-muted-foreground mt-1">
                          <span>{activity.time}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.project}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Website Redesign', progress: 70, status: 'In Progress' },
                    { name: 'Mobile App Development', progress: 30, status: 'Planning' },
                    { name: 'Backend API', progress: 90, status: 'Review' }
                  ].map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-sm text-muted-foreground">{project.status}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Side Panel */}
            <div className="space-y-6">
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '500ms' }}>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">
                      {user.name.split(' ').map(part => part[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <Button variant="outline" className="w-full mb-2">
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Account Settings
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 rounded-xl shadow-sm animate-slide-up" style={{ animationDelay: '600ms' }}>
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    New Project
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Messages
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
