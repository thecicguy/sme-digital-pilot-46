import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const About = () => {
  return <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About CRM4SMEs</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>What drives our service</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to streamline service provider engagement with SMEs, enabling the 
              adoption of lean approaches and digital technologies for business process improvement.
              We believe that small and medium enterprises deserve enterprise-grade tools that are 
              accessible, intuitive, and tailored to their specific needs.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>The Platform</CardTitle>
            <CardDescription>End-to-end CRM solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">CRM4SMEs facilitates end-to-end management of service provider interactions with SMEs, supporting clients in identifying, standardizing, harmonizing, adopting, and adapting innovative digital technologies to enhance business practices and processes.</p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What makes our platform powerful</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Client and contact management with comprehensive profile creation</li>
              <li>Project tracking with customizable types and resource allocation</li>
              <li>Communication logging for onboarding calls, emails, and client notes</li>
              <li>Research management for client insights and competitive analysis</li>
              <li>Task management with status tracking and follow-up creation</li>
              <li>Secure deliverable management with permission controls</li>
              <li>AI-powered reporting for business proposals and implementation plans</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>Experts in digital transformation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our team consists of experienced professionals in digital transformation, 
              business process improvement, and software development. We understand the 
              unique challenges that SMEs face in adopting new technologies and have designed 
              our platform to address these specific needs.
            </p>
            <p className="text-muted-foreground">
              With years of experience working with businesses across various industries, 
              we have developed a deep understanding of what works and what doesn't when it 
              comes to implementing digital solutions in small and medium enterprises.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default About;