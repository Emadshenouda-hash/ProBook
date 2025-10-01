import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import SEO from '../components/SEO';
import type { DefaultTheme } from 'styled-components';

const Container = styled('div')`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled('h1')`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const LastUpdated = styled('p')`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Section = styled('section')`
  margin-bottom: 2rem;
`;

const SectionTitle = styled('h2')`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const Paragraph = styled('p')`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const List = styled('ul')`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

const ListItem = styled('li')`
  line-height: 1.6;
  margin-bottom: 0.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
`;

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TableHeader = styled('th')`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled('td')`
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  padding: 0.75rem;
  vertical-align: top;
`;

const ContactInfo = styled('div')`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

export default function CookiePolicy() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Cookie Policy - ProBook Solutions"
        description="Learn about how ProBook Solutions uses cookies and similar technologies to enhance your experience on our website."
        canonicalPath="/cookies"
        ogType="website"
      />
      <Container>
        <Title>Cookie Policy</Title>
        <LastUpdated>Last updated: {new Date().toLocaleDateString()}</LastUpdated>

        <Section>
          <SectionTitle>What Are Cookies?</SectionTitle>
          <Paragraph>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>How We Use Cookies</SectionTitle>
          <Paragraph>
            ProBook Solutions uses cookies for the following purposes:
          </Paragraph>
          <List>
            <ListItem><strong>Necessary Cookies:</strong> Essential for the website to function properly. These cannot be disabled.</ListItem>
            <ListItem><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve performance.</ListItem>
            <ListItem><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Types of Cookies We Use</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Cookie Type</TableHeader>
                <TableHeader>Purpose</TableHeader>
                <TableHeader>Duration</TableHeader>
                <TableHeader>Can Disable?</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>pb_consent_v1</TableCell>
                <TableCell>Stores your cookie consent preferences</TableCell>
                <TableCell>1 year</TableCell>
                <TableCell>No (necessary)</TableCell>
              </tr>
              <tr>
                <TableCell>themeMode</TableCell>
                <TableCell>Remembers your theme preference (light/dark)</TableCell>
                <TableCell>Persistent</TableCell>
                <TableCell>No (necessary)</TableCell>
              </tr>
              <tr>
                <TableCell>_ga, _ga_*</TableCell>
                <TableCell>Google Analytics tracking</TableCell>
                <TableCell>2 years</TableCell>
                <TableCell>Yes (analytics)</TableCell>
              </tr>
              <tr>
                <TableCell>utm_*</TableCell>
                <TableCell>Marketing campaign tracking</TableCell>
                <TableCell>Session</TableCell>
                <TableCell>Yes (marketing)</TableCell>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section>
          <SectionTitle>Managing Your Cookie Preferences</SectionTitle>
          <Paragraph>
            You can manage your cookie preferences at any time using our cookie banner or by contacting us directly. 
            Please note that disabling certain cookies may affect the functionality of our website.
          </Paragraph>
          <List>
            <ListItem>Use the cookie banner that appears when you first visit our site</ListItem>
            <ListItem>Click the "Cookie Settings" link in our footer</ListItem>
            <ListItem>Contact us directly at privacy@probooksolutions.com</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Third-Party Cookies</SectionTitle>
          <Paragraph>
            We may use third-party services that set their own cookies, including:
          </Paragraph>
          <List>
            <ListItem><strong>Google Analytics:</strong> For website analytics and performance monitoring</ListItem>
            <ListItem><strong>Vercel Analytics:</strong> For performance and usage insights</ListItem>
            <ListItem><strong>Calendly:</strong> For appointment scheduling functionality</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Your Rights</SectionTitle>
          <Paragraph>
            Under applicable data protection laws, you have the right to:
          </Paragraph>
          <List>
            <ListItem>Withdraw your consent to non-essential cookies at any time</ListItem>
            <ListItem>Request information about the cookies we use</ListItem>
            <ListItem>Request deletion of your cookie data</ListItem>
            <ListItem>Lodge a complaint with the relevant supervisory authority</ListItem>
          </List>
        </Section>

        <ContactInfo>
          <SectionTitle>Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions about our use of cookies, please contact us:
          </Paragraph>
          <List>
            <ListItem>Email: privacy@probooksolutions.com</ListItem>
            <ListItem>Phone: +1-555-123-4567</ListItem>
            <ListItem>Address: 123 Business Plaza, New York, NY 10001</ListItem>
          </List>
        </ContactInfo>
      </Container>
    </>
  );
}