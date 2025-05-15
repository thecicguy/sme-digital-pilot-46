
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfUse = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              By accessing or using the CRM for SMEs platform ("Service"), you agree to be bound by these Terms of Use 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
              from using or accessing the Service.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>2. Use License</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Permission is granted to temporarily access and use the Service for personal, non-commercial, or 
              business purposes, subject to the restrictions set forth in these Terms of Use.
            </p>
            <p>This license does not include:</p>
            <ul>
              <li>Modifying or copying the materials except as required for normal Service use</li>
              <li>Using the materials for any commercial purpose other than as intended within the Service</li>
              <li>Attempting to decompile or reverse engineer any software contained in the Service</li>
              <li>Removing any copyright or proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated by CRM for SMEs at any time.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              To access certain features of the Service, you must register for an account. You agree to provide accurate, 
              current, and complete information during the registration process and to update such information to keep it 
              accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding the password and for all activities that occur under your account. You 
              agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. User Content</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Our Service allows you to post, link, store, share, and otherwise make available certain information, text, 
              graphics, or other material ("Content"). You are responsible for the Content that you post on or through 
              the Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through the Service, you represent and warrant that:
            </p>
            <ul>
              <li>You own or have the right to use and share such Content</li>
              <li>The Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity</li>
              <li>The Content does not contain material that is false, intentionally misleading, defamatory, obscene, harassing, threatening, or otherwise unlawful</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>5. Subscription and Payment</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Access to certain features of the Service requires a subscription. Payment terms are specified during the 
              subscription process. All payments are non-refundable except as required by law or as explicitly stated 
              in our refund policy.
            </p>
            <p>
              We reserve the right to change subscription fees upon reasonable notice. Such notice may be sent to you 
              via the email address provided during registration or posted on our website.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>6. Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              The materials on the Service are provided on an 'as is' basis. We make no warranties, expressed or implied, 
              and hereby disclaim and negate all other warranties including, without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
              or other violation of rights.
            </p>
            <p>
              We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the 
              use of the materials on the Service or otherwise relating to such materials or on any sites linked to the Service.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>7. Limitations</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              In no event shall CRM for SMEs or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on the Service, even if CRM for SMEs or a CRM for SMEs authorized representative has 
              been notified orally or in writing of the possibility of such damage.
            </p>
            <p>
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for 
              consequential or incidental damages, these limitations may not apply to you.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>8. Accuracy of Materials</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              The materials appearing on the Service could include technical, typographical, or photographic errors. We 
              do not warrant that any of the materials on the Service are accurate, complete, or current. We may make 
              changes to the materials contained on the Service at any time without notice.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>9. Links</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              We have not reviewed all of the sites linked to the Service and are not responsible for the contents of 
              any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any 
              such linked website is at the user's own risk.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>10. Modifications</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              We may revise these Terms of Use at any time without notice. By using the Service, you are agreeing to be 
              bound by the then-current version of these Terms of Use.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>11. Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without 
              regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
              of these Terms will remain in effect.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>12. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <p>
              Email: legal@crmforsmes.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfUse;
