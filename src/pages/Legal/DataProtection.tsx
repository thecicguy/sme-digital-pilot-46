
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataProtection = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Protection Notice</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              This Data Protection Notice describes the specific policies and procedures we use to protect 
              your data when using our CRM for SMEs platform. This notice complements our Data Privacy Policy 
              by providing details on the technical and organizational measures we employ.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Processing Activities</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We process data for the following business purposes:</p>
            <ul>
              <li>Customer relationship management</li>
              <li>Project and task management</li>
              <li>Communication logging and tracking</li>
              <li>Document and deliverable management</li>
              <li>Reporting and analytics</li>
              <li>User account administration</li>
            </ul>
            <p>
              For each processing activity, we maintain records as required by applicable data 
              protection regulations, including the legal basis for processing, data retention periods, 
              and categories of data recipients.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Protection Measures</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We implement the following technical measures to protect your data:</p>
            <ul>
              <li>
                <strong>Encryption:</strong> All data in transit is encrypted using TLS 1.2 or higher. 
                Data at rest is encrypted using AES-256 encryption.
              </li>
              <li>
                <strong>Access Controls:</strong> Multi-factor authentication, role-based access controls, 
                and least privilege principles.
              </li>
              <li>
                <strong>Network Security:</strong> Firewalls, intrusion detection/prevention systems, and 
                regular security scanning.
              </li>
              <li>
                <strong>Backup and Recovery:</strong> Regular data backups with secure off-site storage and 
                tested recovery procedures.
              </li>
              <li>
                <strong>Monitoring:</strong> 24/7 system monitoring and logging of access and system activities.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Organizational Protection Measures</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We implement the following organizational measures to protect your data:</p>
            <ul>
              <li>
                <strong>Staff Training:</strong> Regular privacy and security awareness training for 
                all employees.
              </li>
              <li>
                <strong>Security Policies:</strong> Documented security policies and procedures that 
                are regularly reviewed and updated.
              </li>
              <li>
                <strong>Vendor Management:</strong> Diligent assessment and ongoing management of 
                third-party service providers who process data.
              </li>
              <li>
                <strong>Incident Response:</strong> Documented incident response procedures and regular 
                testing of our ability to respond to breaches.
              </li>
              <li>
                <strong>Data Protection Impact Assessments:</strong> Conducted for new processing 
                activities or significant changes to existing ones.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Subject Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>We have established procedures to handle the following data subject requests:</p>
            <ul>
              <li>Access to personal data</li>
              <li>Rectification of inaccurate data</li>
              <li>Erasure of data ("right to be forgotten")</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Rights related to automated decision-making and profiling</li>
            </ul>
            <p>
              Requests should be submitted to privacy@crmforsmes.com. We will respond to all requests 
              within 30 days as required by applicable regulations.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Breach Response</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              In the event of a data breach that poses a risk to the rights and freedoms of individuals, 
              we will:
            </p>
            <ul>
              <li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach</li>
              <li>Notify affected individuals without undue delay when the breach is likely to result in a high risk to their rights and freedoms</li>
              <li>Document all breaches, including facts, effects, and remedial actions taken</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              When transferring personal data outside of the European Economic Area (EEA) or the user's 
              country of residence, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul>
              <li>Standard contractual clauses approved by the European Commission</li>
              <li>Binding corporate rules for transfers within corporate groups</li>
              <li>Compliance with approved certification mechanisms or codes of conduct</li>
              <li>Where applicable, transfers to countries with adequacy decisions</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Protection Officer</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Our Data Protection Officer can be contacted at:
            </p>
            <p>
              Email: dpo@crmforsmes.com<br />
              Phone: +1 (555) 987-6543
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataProtection;
