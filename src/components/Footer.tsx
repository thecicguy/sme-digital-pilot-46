
const Footer = () => {
  return <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">CRM for SMEs</h3>
            <p className="text-sm text-muted-foreground">
              Streamline service provider interactions with SMEs. Enhance business processes with our modern CRM solution.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/brendonmcloughlin/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/FrugalInnovator" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">X</a>
              </li>
              <li>
                <a href="https://www.facebook.com/brendon.mcloughlin" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Meta</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 InnovationWorks.ie. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
