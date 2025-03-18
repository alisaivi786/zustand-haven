
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';

const Index = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        
        <section className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover why our approach to modern web development stands out
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Simple State Management',
                  description: 'Zustand provides an intuitive way to manage application state with minimal boilerplate.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 7h-3a2 2 0 0 0-2 2v.5"></path>
                      <path d="M14 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"></path>
                      <path d="M14 15h1"></path>
                      <path d="M17 15h1"></path>
                      <path d="M14 19h4"></path>
                      <path d="M5 8V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"></path>
                    </svg>
                  )
                },
                {
                  title: 'Beautiful UI',
                  description: 'Elegant, minimalist design that puts your content first and delights users.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                      <path d="M12 2v2"></path>
                      <path d="M12 22v-2"></path>
                      <path d="m17 20.66-1-1.73"></path>
                      <path d="M11 10.27 7 3.34"></path>
                      <path d="m20.66 17-1.73-1"></path>
                      <path d="m3.34 7 1.73 1"></path>
                      <path d="M14 12h8"></path>
                      <path d="M2 12h2"></path>
                      <path d="m20.66 7-1.73 1"></path>
                      <path d="m3.34 17 1.73-1"></path>
                      <path d="m17 3.34-1 1.73"></path>
                      <path d="m7 20.66 1-1.73"></path>
                    </svg>
                  )
                },
                {
                  title: 'Secure Authentication',
                  description: 'Modern authentication flows with token and refresh token handling for maximum security.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      <circle cx="12" cy="16" r="1"></circle>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all group animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4 bg-primary/5">
          <div className="container max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="md:w-1/2 animate-slide-up">
                <div className="text-sm text-primary font-medium mb-3">Seamless Experience</div>
                <h2 className="text-3xl font-bold mb-4">Modern Authentication</h2>
                <p className="text-muted-foreground mb-6">
                  Our application uses a sophisticated token-based authentication system that provides
                  both security and convenience. With refresh tokens, users stay logged in without
                  compromising security.
                </p>
                <ul className="space-y-3">
                  {[
                    'Secure login with JWT tokens',
                    'Automatic token refresh',
                    'Session persistence',
                    'Protection against common attacks'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-primary mr-2 mt-0.5 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur"></div>
                  <div className="relative bg-white/80 dark:bg-black/50 backdrop-blur-md p-6 border border-white/20 rounded-lg shadow-xl">
                    <div className="space-y-4">
                      <div className="h-2 w-2/3 bg-primary/20 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-primary/20 rounded-full"></div>
                      <div className="h-10 w-full bg-primary/10 rounded-md"></div>
                      <div className="h-10 w-full bg-primary/10 rounded-md"></div>
                      <div className="h-10 w-full bg-primary/40 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="py-10 px-4 border-t">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span className="font-semibold text-lg">Zustand Haven</span>
                <span className="text-muted-foreground text-sm">© 2023</span>
              </div>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary">Privacy</a>
                <a href="#" className="hover:text-primary">Terms</a>
                <a href="#" className="hover:text-primary">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
