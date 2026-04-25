import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Tab as ReactTab,
  TabList,
  TabPanel,
  Tabs as ReactTabs,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.scss';
import { Tab } from './types/Tab';

const tabs: Tab[] = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

const ActiveNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive =
    to === '/'
      ? location.pathname === '/'
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link className={`navbar-item${isActive ? ' is-active' : ''}`} to={to}>
      {children}
    </Link>
  );
};

const HomePage = () => (
  <>
    <h1 className="title">Home page</h1>
    <p>Welcome to the Home page.</p>
  </>
);

const TabsPage = () => {
  const navigate = useNavigate();
  const { tabId } = useParams<{ tabId?: string }>();
  const activeIndex = tabs.findIndex(tab => tab.id === tabId);

  if (activeIndex === -1) {
    return (
      <>
        <h1 className="title">Tabs page</h1>
        <p className="notification is-warning">Please select a tab</p>
      </>
    );
  }

  return (
    <>
      <h1 className="title">Tabs page</h1>

      <ReactTabs
        selectedIndex={activeIndex}
        onSelect={index => navigate(`/tabs/${tabs[index].id}`)}
      >
        <TabList>
          {tabs.map(tab => (
            <ReactTab key={tab.id} data-cy="Tab">
              {tab.title}
            </ReactTab>
          ))}
        </TabList>

        {tabs.map(tab => (
          <TabPanel key={tab.id} data-cy="TabContent">
            {tab.content}
          </TabPanel>
        ))}
      </ReactTabs>
    </>
  );
};

const NotFoundPage = () => (
  <>
    <h1 className="title">Page not found</h1>
    <p>The page you are looking for does not exist.</p>
  </>
);

export const App = () => (
  <>
    {/* Also requires <html class="has-navbar-fixed-top"> */}
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <ActiveNavLink to="/">Home</ActiveNavLink>
          <ActiveNavLink to="/tabs">Tabs</ActiveNavLink>
        </div>
      </div>
    </nav>

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/tabs">
            <Route index element={<TabsPage />} />
            <Route path=":tabId" element={<TabsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </>
);
