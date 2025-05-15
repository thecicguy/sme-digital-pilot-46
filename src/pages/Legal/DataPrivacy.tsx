
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataPrivacy = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Privacy Policy</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              This Data Privacy Policy explains how CRM for SMEs ("we," "our," or "us") collects, 
              uses, shares, and protects your personal information when you use our services, 
              website, and applications (collectively, the "Services").
            </p>
            <p>
              We are committed to protecting your privacy and handling your data in a transparent and 
              lawful manner. By using our Services, you consent to the practices described in this policy.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, company name, 
                job title, and other contact details.
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials, account preferences, and other 
                information you provide when creating an account.
              </li>
              <li>
                <strong>Client and Contact Data:</strong> Information about your clients and their contacts 
                that you input into our system.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our Services, including log files, 
                device information, IP addresses, and analytics data.
              </li>
              <li>
                <strong>Communication Data:</strong> Records of your communications with us and other users 
                of the Services.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>Provide, maintain, and improve our Services</li>
              <li>Process and complete transactions</li>
              <li>Send transactional messages and service announcements</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer service and technical support</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Personalize and improve your experience with our Services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us operate our business 
                and provide our Services.
              </li>
              <li>
                <strong>Business Partners:</strong> Companies we partner with to offer joint services or products.
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law, regulation, legal process, or 
                governmental request.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have given us permission to share your information.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              information against unauthorized access, disclosure, alteration, and destruction. However, 
              no data transmission or storage system is 100% secure, and we cannot guarantee the absolute 
              security of your information.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access and obtain a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability (receive your data in a structured format)</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              We may update this Data Privacy Policy from time to time. If we make material changes, 
              we will notify you through our Services or by other means, such as email. We encourage 
              you to periodically review this page for the latest information on our privacy practices.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              If you have any questions or concerns about this Data Privacy Policy or our privacy 
              practices, please contact us at:
            </p>
            <p>
              Email: privacy@crmforsmes.com<br />
              Postal Address: 123 Business Avenue, Suite 456, San Francisco, CA 94105<br />
              Phone: +1 (555) 123-4567
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPrivacy;
