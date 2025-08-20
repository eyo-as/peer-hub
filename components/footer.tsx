import React from "react";

const Footer = () => {
  return (
    <main>
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                © 2024 Peer-Hub. Built for student collaboration.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
