import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

// ? Layouts
import RootLayout from '@/layouts/RootLayout';

// ? === Views ===

// Announcements
import AnnouncementsView from '@/modules/announcements/views/AnnouncementsView';
import CreateAnnouncementView from '@/modules/announcements/views/CreateAnnouncementView';
import ContactView from '@/modules/announcements/views/ContactView';

// Calendar
import CalendarView from '@/modules/calendar/views/CalendarView';

// Inventory
import InventoryView from '@/modules/inventory/views/InventoryView';
import CreateInventoryView from '@/modules/inventory/views/CreateInventoryView';

// Requests
import RequestsView from '@/modules/requests/views/RequestsView';

// Leads
import LeadsView from '@/modules/leads/views/LeadsView';
import LeadsFormView from '@/modules/leads/views/LeadsFormView';

// Users
import UsersView from '@/modules/users/views/UsersView';
import UsersFormView from '@/modules/users/views/UsersFormView';

// 404
import { NotFound } from '@/modules/global/views/NotFound';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/inventario" />} />

        <Route path="calendario">
          <Route index element={<CalendarView />} />
        </Route>

        <Route path="inventario">
          <Route index element={<InventoryView />} />
          <Route path="nuevo" element={<CreateInventoryView />} />
        </Route>

        <Route path="publicaciones">
          <Route index element={<AnnouncementsView />} />
          <Route path="nueva/:id" element={<CreateAnnouncementView />} />
          <Route path="contact/:id" element={<ContactView />} />
        </Route>

        <Route path="peticiones">
          <Route index element={<RequestsView />} />
        </Route>

        <Route path="leads">
          <Route index element={<LeadsView />} />
          <Route path="nuevo" element={<LeadsFormView />} />
        </Route>

        <Route path="usuarios">
          <Route index element={<UsersView />} />
          <Route path="nuevo" element={<UsersFormView />} />
          <Route path="editar/:id" element={<UsersFormView />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);
