
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoanApplicationForm from './components/LoanApplicationForm';
import ComplaintModal from './components/ComplaintModal';
import LoanDetailPage from './components/LoanDetailPage';
import { loanProducts } from './constants';
import ProfilePage from './components/ProfilePage';
import HelpModal from './components/HelpModal';
import AboutUsPage from './components/AboutUsPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

type Page = 'FORM' | 'PROFILE' | 'ABOUT_US' | 'PERSONAL_LOAN' | 'BUSINESS_LOAN' | 'GOLD_LOAN' | 'VEHICLE_LOAN' | 'HOME_LOAN' | 'EDUCATION_LOAN' | 'LOGIN' | 'SIGNUP';

const App: React.FC = () => {
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('FORM');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLogin = () => {
      setIsAuthenticated(true);
      navigateTo('FORM');
  }

  const handleLogout = () => {
      setIsAuthenticated(false);
      navigateTo('FORM');
  }

  const handleCIBILClick = () => {
    window.open('https://myscore.cibil.com/CreditView/enrollShort_new.page?enterprise=CIBIL&offer=FACRA', '_blank');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'FORM':
            return <LoanApplicationForm onSelectLoan={(loanId) => navigateTo(loanId as Page)} />;
        case 'LOGIN':
            return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => navigateTo('SIGNUP')} />;
        case 'SIGNUP':
            return <SignUpPage onSignUp={handleLogin} onNavigateToLogin={() => navigateTo('LOGIN')} />;
        case 'PROFILE':
            if (!isAuthenticated) {
                navigateTo('LOGIN');
                return null;
            }
            return <ProfilePage />;
        case 'ABOUT_US':
            return <AboutUsPage />;
        default:
            const selectedLoan = loanProducts.find(loan => loan.id === currentPage);
            if (selectedLoan) {
                return <LoanDetailPage loan={selectedLoan} onBack={() => navigateTo('FORM')} />;
            }
            return <LoanApplicationForm onSelectLoan={(loanId) => navigateTo(loanId as Page)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogoClick={() => navigateTo('FORM')} 
        onNavigateToProfile={() => navigateTo('PROFILE')}
        onLoginClick={() => navigateTo('LOGIN')}
        onLogoutClick={handleLogout}
        onProductSelect={(loanId) => navigateTo(loanId as Page)}
        onCIBILClick={handleCIBILClick}
        onHelpClick={() => setIsHelpModalOpen(true)}
      />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {renderCurrentPage()}
      </main>
      <Footer onComplaintClick={() => setIsComplaintModalOpen(true)} onAboutUsClick={() => navigateTo('ABOUT_US')} />
      {isComplaintModalOpen && <ComplaintModal onClose={() => setIsComplaintModalOpen(false)} />}
      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
    </div>
  );
};

export default App;
