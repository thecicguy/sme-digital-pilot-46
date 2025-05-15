
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Copyright = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Copyright Notice</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Copyright Statement</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              © 2025 CRM for SMEs. All rights reserved.
            </p>
            <p>
              All content included on this website and within our application, such as text, graphics, logos, 
              button icons, images, audio clips, digital downloads, data compilations, and software, is the 
              property of CRM for SMEs or its content suppliers and is protected by international copyright laws.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Permitted Use</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Permission is granted to temporarily view the materials (information or software) on CRM for SMEs' 
              website for personal, non-commercial use only. This is the grant of a license, not a transfer of 
              title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempt to decompile or reverse engineer any software contained on CRM for SMEs' website or application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Termination of Use</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated by CRM for SMEs at any time. Upon terminating your viewing of these materials or upon 
              the termination of this license, you must destroy any downloaded materials in your possession, 
              whether in electronic or printed format.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Content</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              When you upload content to our application or website, you retain ownership of your intellectual property 
              rights. However, by uploading content, you grant CRM for SMEs a worldwide, non-exclusive, royalty-free 
              license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, 
              display, and distribute such content in any and all media or distribution methods now known or later developed, 
              solely for the purpose of providing and improving our services.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Trademarks</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              CRM for SMEs and the CRM for SMEs logo are trademarks of CRM for SMEs. All other trademarks, service marks, 
              graphics, and logos used in connection with our website or application are the trademarks of their respective 
              owners. Our use of these trademarks does not indicate any relationship, sponsorship, or endorsement between 
              CRM for SMEs and the owners of these trademarks.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Third-Party Content</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Our website or application may include content provided by third parties, including materials from other users 
              and third-party licensors. All statements and/or opinions expressed in these materials, other than the content 
              provided by CRM for SMEs, are solely the opinions and the responsibility of the person or entity providing those 
              materials. These materials do not necessarily reflect the opinion of CRM for SMEs.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Digital Millennium Copyright Act (DMCA)</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              If you believe that material available on our website or application infringes on your copyright, you (or your 
              agent) may send us a notice requesting that the material be removed or access to it blocked. Notices and counter-notices 
              must meet the then-current statutory requirements imposed by the DMCA.
            </p>
            <p>
              Notices should be sent to our designated copyright agent at:
            </p>
            <p>
              Copyright Agent<br />
              CRM for SMEs<br />
              123 Business Avenue, Suite 456<br />
              San Francisco, CA 94105<br />
              Email: copyright@crmforsmes.com
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Open Source Software</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              Our application may include open source software components released under various open source licenses. 
              Nothing in this Copyright Notice limits your rights under, or grants you rights that supersede, the terms 
              and conditions of any applicable open source software license.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>
              If you have any questions about this Copyright Notice, please contact us:
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

export default Copyright;
