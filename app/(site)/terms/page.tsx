export default function TermsPage() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-6 lg:px-8 gap-16 lg:gap-20 min-h-[60vh] pb-24">
      <div className="flex flex-col gap-8 max-w-3xl mt-12 lg:mt-20">
        <div className="flex items-start gap-3">
          <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
            Legal
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl font-bold tracking-tight text-[var(--ink)] leading-[1] text-balance">
          Terms of
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">service</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--accent)] -z-0 opacity-80" />
          </span>
        </h1>
        <p className="text-sm text-[var(--ink-soft)]">
          Last updated: June 10, 2026
        </p>
      </div>

      <Section title="Introduction">
        <p>
          These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern your access to and use of the Cukkr platform,
          including our website, mobile applications, and services (collectively, the &ldquo;<strong>Platform</strong>&rdquo;).
          By accessing or using the Platform, you agree to be bound by these Terms.
        </p>
        <p>
          Cukkr is operated by PT AURA KODE NUSANTARA. If you do not agree to these Terms, please do not use the Platform.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          To use certain features of the Platform, you must create an account. You are responsible for maintaining
          the confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        <p>
          You agree to provide accurate, current, and complete information during registration and to update such information
          to keep it accurate, current, and complete.
        </p>
      </Section>

      <Section title="Use of the platform">
        <p>
          You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:
        </p>
        <p>Use the Platform in any way that violates any applicable law or regulation.</p>
        <p>Interfere with or disrupt the Platform or servers or networks connected to the Platform.</p>
        <p>Attempt to gain unauthorized access to any portion of the Platform or any other accounts, systems, or networks.</p>
        <p>Use the Platform to transmit any malicious software, spam, or harmful content.</p>
      </Section>

      <Section title="Barbershop accounts">
        <p>
          Barbershop owners and their invited team members are responsible for the accuracy of shop information,
          services, pricing, and availability displayed on the Platform.
        </p>
        <p>
          Public booking pages may display certain shop information to end customers. It is the shop owner&apos;s responsibility
          to ensure this information remains accurate and up to date.
        </p>
      </Section>

      <Section title="Payments and subscriptions">
        <p>
          Some features of the Platform may require payment. All fees are described on the Platform and are subject to change
          with reasonable notice. Subscription fees are non-refundable except as required by law or as explicitly stated otherwise.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          All content, trademarks, logos, and intellectual property displayed on the Platform are the property of Cukkr
          or its licensors. You may not use, reproduce, distribute, or create derivative works without our prior written consent.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Cukkr shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of or relating to your use of the Platform.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          We may suspend or terminate your access to the Platform at any time, with or without notice, for conduct
          that we believe violates these Terms or is harmful to other users, us, or third parties.
        </p>
        <p>
          You may terminate your account at any time by contacting us. Upon termination, your right to use the Platform
          will immediately cease.
        </p>
      </Section>

      <Section title="Changes to terms">
        <p>
          We may update these Terms from time to time. We will notify you of material changes via email or through the Platform.
          Continued use of the Platform after changes constitutes acceptance of the updated Terms.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These Terms are governed by the laws of Indonesia. Any disputes arising from these Terms or the Platform
          shall be subject to the exclusive jurisdiction of the courts of Indonesia.
        </p>
      </Section>

      <Section title="Contact us">
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:hello@cukkr.com" className="text-[var(--ink)] underline hover:text-[var(--accent-dark)] transition-colors">
            hello@cukkr.com
          </a>.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-[var(--border)] pt-10">
      <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      <div className="text-base lg:text-lg text-[var(--ink-soft)] leading-relaxed max-w-3xl flex flex-col gap-3 text-balance">
        {children}
      </div>
    </section>
  );
}
