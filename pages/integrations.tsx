import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const CategorySection = styled.div`
  margin-bottom: 4rem;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
`;

const IntegrationCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
`;

const LogoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(14, 165, 233, 0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const IntegrationName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const IntegrationDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin: 0;
  line-height: 1.5;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.75rem;
`;

const CapabilitiesSection = styled.div`
  margin: 4rem 0;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
  border-radius: 12px;
  padding: 3rem 2rem;
`;

const CapabilitiesTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CapabilityCard = styled.div`
  text-align: center;
`;

const CapabilityIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CapabilityTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const CapabilityDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin: 0;
  line-height: 1.6;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  margin-top: 4rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(109, 40, 217, 0.3);
  }
`;

export default function IntegrationsPage() {
  const { t } = useTranslation();
  
  return (
    <Section>
      <SEO
        title="Technology & Integrations - ProBook Solutions"
        description="Comprehensive list of accounting software, e-commerce platforms, payment processors, and business tools we integrate with including QuickBooks, Xero, Shopify, and more."
        canonicalPath="/integrations"
      />

      <Title>{t('integrations.title', { defaultValue: 'Technology & Integrations' })}</Title>
      <Subtitle>
        {t('integrations.subtitle', { defaultValue: 'We work with the tools you already use. Our expertise spans leading accounting platforms, e-commerce systems, payment processors, and business management software.' })}
      </Subtitle>

      <CategorySection>
        <CategoryTitle>{t('integrations.accounting_erp', { defaultValue: 'Accounting & ERP Software' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>📊</LogoPlaceholder>
            <IntegrationName>QuickBooks Desktop</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.quickbooks_desktop.desc', { defaultValue: 'Enterprise, Pro, Premier. 20+ years of expertise in setup, migration, and optimization.' })}
            </IntegrationDescription>
            <Badge>{t('integrations.expert', { defaultValue: 'Expert' })}</Badge>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>☁️</LogoPlaceholder>
            <IntegrationName>QuickBooks Online</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.quickbooks_online.desc', { defaultValue: 'Cloud-based accounting with real-time collaboration. Advanced ProAdvisor certified.' })}
            </IntegrationDescription>
            <Badge>{t('integrations.certified', { defaultValue: 'Certified' })}</Badge>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📈</LogoPlaceholder>
            <IntegrationName>Xero</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.xero.desc', { defaultValue: 'Modern cloud accounting for small businesses. Certified Xero partner with proven implementations.' })}
            </IntegrationDescription>
            <Badge>{t('integrations.certified', { defaultValue: 'Certified' })}</Badge>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🔷</LogoPlaceholder>
            <IntegrationName>Zoho Books</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.zoho_books.desc', { defaultValue: 'Affordable cloud accounting with CRM integration. Expert in setup and customization.' })}
            </IntegrationDescription>
            <Badge>{t('integrations.partner', { defaultValue: 'Partner' })}</Badge>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🏢</LogoPlaceholder>
            <IntegrationName>NetSuite</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.netsuite.desc', { defaultValue: 'Enterprise ERP for complex organizations. Financial management and reporting expertise.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📦</LogoPlaceholder>
            <IntegrationName>Odoo</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.odoo.desc', { defaultValue: 'Open-source ERP with accounting module. Implementation and configuration support.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>{t('integrations.ecommerce', { defaultValue: 'E-commerce Platforms' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>🛒</LogoPlaceholder>
            <IntegrationName>Shopify</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.shopify.desc', { defaultValue: 'Sales reconciliation, inventory sync, and multi-channel reporting.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📦</LogoPlaceholder>
            <IntegrationName>Amazon Seller Central</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.amazon.desc', { defaultValue: 'FBA accounting, fee breakdowns, inventory tracking, and sales reports.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🎯</LogoPlaceholder>
            <IntegrationName>Target Plus</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.target_plus.desc', { defaultValue: 'Vendor portal integration for sales tracking and reconciliation.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🏪</LogoPlaceholder>
            <IntegrationName>Walmart Marketplace</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.walmart.desc', { defaultValue: 'Seller account reconciliation and multi-channel inventory management.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🛍️</LogoPlaceholder>
            <IntegrationName>WooCommerce</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.woocommerce.desc', { defaultValue: 'WordPress e-commerce integration with accounting systems.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🏬</LogoPlaceholder>
            <IntegrationName>BigCommerce</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.bigcommerce.desc', { defaultValue: 'Enterprise e-commerce platform with advanced reporting needs.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>{t('integrations.payments', { defaultValue: 'Payment Processors' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>💳</LogoPlaceholder>
            <IntegrationName>Stripe</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.stripe.desc', { defaultValue: 'Transaction reconciliation, fee tracking, and revenue recognition.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🔲</LogoPlaceholder>
            <IntegrationName>Square</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.square.desc', { defaultValue: 'POS and online payment reconciliation, inventory sync.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>💰</LogoPlaceholder>
            <IntegrationName>PayPal</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.paypal.desc', { defaultValue: 'Transaction import, fee allocation, and multi-currency support.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🌐</LogoPlaceholder>
            <IntegrationName>Authorize.net</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.authorize_net.desc', { defaultValue: 'Payment gateway integration for transaction tracking.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>{t('integrations.inventory', { defaultValue: 'Inventory & Operations' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>📋</LogoPlaceholder>
            <IntegrationName>DEAR Inventory</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.dear_inventory.desc', { defaultValue: 'Advanced inventory management with manufacturing and multi-location support.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🏭</LogoPlaceholder>
            <IntegrationName>Cin7</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.cin7.desc', { defaultValue: 'Omnichannel inventory and order management system integration.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📊</LogoPlaceholder>
            <IntegrationName>TradeGecko (QuickBooks Commerce)</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.tradegecko.desc', { defaultValue: 'Inventory and order management for wholesale and retail.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📦</LogoPlaceholder>
            <IntegrationName>ShipStation</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.shipstation.desc', { defaultValue: 'Shipping cost tracking and fulfillment reconciliation.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>{t('integrations.ap_expense', { defaultValue: 'Accounts Payable & Expense Management' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>💸</LogoPlaceholder>
            <IntegrationName>Bill.com</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.bill_com.desc', { defaultValue: 'AP automation, bill approvals, and payment processing.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📄</LogoPlaceholder>
            <IntegrationName>Expensify</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.expensify.desc', { defaultValue: 'Expense report automation and receipt management.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>💼</LogoPlaceholder>
            <IntegrationName>Ramp</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.ramp.desc', { defaultValue: 'Corporate card and expense management platform.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>🎫</LogoPlaceholder>
            <IntegrationName>Brex</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.brex.desc', { defaultValue: 'Startup-focused corporate card with built-in expense tracking.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>{t('integrations.collaboration', { defaultValue: 'Collaboration & Productivity' })}</CategoryTitle>
        <Grid>
          <IntegrationCard>
            <LogoPlaceholder>📧</LogoPlaceholder>
            <IntegrationName>Google Workspace</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.google_workspace.desc', { defaultValue: 'Gmail, Drive, Sheets for document sharing and collaboration.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>💬</LogoPlaceholder>
            <IntegrationName>Slack</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.slack.desc', { defaultValue: 'Real-time communication for quick questions and updates.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📝</LogoPlaceholder>
            <IntegrationName>Asana</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.asana.desc', { defaultValue: 'Project management for tracking deliverables and deadlines.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📌</LogoPlaceholder>
            <IntegrationName>Notion</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.notion.desc', { defaultValue: 'Documentation, wiki, and knowledge base management.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📊</LogoPlaceholder>
            <IntegrationName>Microsoft Excel</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.microsoft_excel.desc', { defaultValue: 'Advanced spreadsheet analysis, pivot tables, and financial modeling.' })}
            </IntegrationDescription>
          </IntegrationCard>

          <IntegrationCard>
            <LogoPlaceholder>📈</LogoPlaceholder>
            <IntegrationName>Google Sheets</IntegrationName>
            <IntegrationDescription>
              {t('integrations.cards.google_sheets.desc', { defaultValue: 'Cloud-based spreadsheets for collaborative financial analysis.' })}
            </IntegrationDescription>
          </IntegrationCard>
        </Grid>
      </CategorySection>

      <CapabilitiesSection>
        <CapabilitiesTitle>{t('integrations.capabilities_title', { defaultValue: 'What We Can Do With Your Tech Stack' })}</CapabilitiesTitle>
        <CapabilitiesGrid>
          <CapabilityCard>
            <CapabilityIcon>🔗</CapabilityIcon>
            <CapabilityTitle>Seamless Integration</CapabilityTitle>
            <CapabilityDescription>
              Connect your accounting software with e-commerce platforms, payment processors, and inventory systems for automated data flow.
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon>🔄</CapabilityIcon>
            <CapabilityTitle>Data Migration</CapabilityTitle>
            <CapabilityDescription>
              Switch between platforms safely with complete data transfer, including historical transactions, customers, and vendors.
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon>⚙️</CapabilityIcon>
            <CapabilityTitle>Custom Setup</CapabilityTitle>
            <CapabilityDescription>
              Configure chart of accounts, workflows, and automation rules tailored to your business processes.
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon>📊</CapabilityIcon>
            <CapabilityTitle>Multi-Channel Reporting</CapabilityTitle>
            <CapabilityDescription>
              Consolidate data from multiple sources into unified financial reports with accurate P&L by channel, product, or region.
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon>🧹</CapabilityIcon>
            <CapabilityTitle>Data Cleanup</CapabilityTitle>
            <CapabilityDescription>
              Fix historical errors, reconcile discrepancies, and standardize categories across all your connected systems.
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon>🎓</CapabilityIcon>
            <CapabilityTitle>Training & Documentation</CapabilityTitle>
            <CapabilityDescription>
              Train your team on best practices, create process documentation, and set up internal controls.
            </CapabilityDescription>
          </CapabilityCard>
        </CapabilitiesGrid>
      </CapabilitiesSection>

      <CTASection>
        <h2 style={{ marginTop: 0 }}>{t('integrations.dont_see_title', { defaultValue: 'Don\'t See Your Software?' })}</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          {t('integrations.dont_see_desc', { defaultValue: 'We\'re always expanding our integration capabilities. If you use a platform not listed here, let\'s discuss how we can work with your existing tools or recommend alternatives.' })}
        </p>
        <CTAButton href="/consultation">
          {t('integrations.book_free_consultation', { defaultValue: 'Book a Free Consultation' })}
        </CTAButton>
      </CTASection>
    </Section>
  );
}
