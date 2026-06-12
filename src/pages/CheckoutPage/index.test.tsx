import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@/i18n'
import i18n from '@/i18n'
import checkoutEn from '@/locales/checkout/en.json'
import type { UserProfile } from '@/pages/userProfile/types'
import { getDefaultProfile, profileReducer } from '@/store/profile'
import { CheckoutPage } from './index'

const validProfile: UserProfile = {
  ...getDefaultProfile(),
  id: 'user-1',
  fullName: 'Sona Mkrtchyan',
  email: 'sona@example.com',
}

const createTestStore = (profile: UserProfile = getDefaultProfile()) =>
  configureStore({
    reducer: {
      profile: profileReducer,
    },
    preloadedState: {
      profile,
    },
  })

const renderCheckoutPage = (eventId: string, profile: UserProfile = getDefaultProfile()) => {
  const store = createTestStore(profile)

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <MemoryRouter initialEntries={[`/checkout/${eventId}`]}>
            <Routes>
              <Route path="/checkout/:eventId" element={<CheckoutPage />} />
            </Routes>
          </MemoryRouter>
        </ConfigProvider>
      </I18nextProvider>
    </Provider>,
  )
}

const getContactStepSection = () => screen.getByLabelText(checkoutEn.steps.contact.aria)

describe('CheckoutPage', () => {
  it('shows event-specific summary and ticket tiers for a profile booking event id', () => {
    renderCheckoutPage('event-jazz-fest')

    expect(screen.getByText('Yerevan Jazz Night at Cascade')).toBeInTheDocument()
    expect(screen.getByText('General Admission')).toBeInTheDocument()
    expect(screen.getByText('VIP Backstage Pass')).toBeInTheDocument()
  })

  it('shows marathon ticket tiers for a marathon event id', () => {
    renderCheckoutPage('event-marathon')

    expect(screen.getByText('Yerevan Marathon 2026')).toBeInTheDocument()
    expect(screen.getByText('Runner Entry')).toBeInTheDocument()
    expect(screen.getByText('Spectator Pass')).toBeInTheDocument()
  })

  it('shows checkout for a home event detail id from mock data', () => {
    renderCheckoutPage('event-jazz-fest')

    expect(screen.getByText('Yerevan Jazz Night at Cascade')).toBeInTheDocument()
    expect(screen.getByText('General Admission')).toBeInTheDocument()
  })

  it('shows checkout for a category event detail id from mock data', () => {
    renderCheckoutPage('event-modern-art')

    expect(screen.getByText('Modern Art Exhibition')).toBeInTheDocument()
    expect(screen.getByText('General Admission')).toBeInTheDocument()
  })

  it('shows unavailable state for an unknown event id', () => {
    renderCheckoutPage('unknown-event-id')

    expect(screen.getByText(checkoutEn.messages.eventNotFound)).toBeInTheDocument()
  })

  it('shows free checkout flow without payment form for a free event', async () => {
    renderCheckoutPage('event-tech-meetup-tumo')

    expect(screen.getByText('Tech Meetup Yerevan')).toBeInTheDocument()
    expect(screen.getAllByText(checkoutEn.summary.free).length).toBeGreaterThan(0)
    expect(screen.getByText(checkoutEn.payment.freeNotice)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: checkoutEn.summary.reserveTicket }),
    ).toBeInTheDocument()
    expect(screen.queryByLabelText(checkoutEn.payment.fields.cardNumber)).not.toBeInTheDocument()
  })

  it('shows checked inactive contact step when profile has valid name and email', () => {
    renderCheckoutPage('event-tech-meetup-tumo', validProfile)

    expect(screen.getByDisplayValue(validProfile.fullName)).toBeDisabled()
    expect(screen.getByDisplayValue(validProfile.email)).toBeDisabled()
    expect(getContactStepSection().querySelector('.anticon-check')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: checkoutEn.summary.reserveTicket })).toBeEnabled()
  })

  it('keeps contact step incomplete when profile email is missing', () => {
    renderCheckoutPage('event-tech-meetup-tumo', {
      ...validProfile,
      email: '',
    })

    expect(getContactStepSection().querySelector('.anticon-check')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: checkoutEn.summary.reserveTicket })).toBeDisabled()
  })
})
