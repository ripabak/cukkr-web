export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 lg:p-12 gap-16 min-h-screen">
      <div className="flex flex-col gap-6 max-w-3xl mt-12">
        <div className="flex items-center gap-4">
          <span className="w-8 h-[2px] bg-[#ffc81e]" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#6b7280]">
            Legal
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase text-[#1a1a1a] leading-[0.9]">
          Privacy
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">Policy</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ffc81e] -z-0" />
          </span>
        </h1>
        <p className="text-sm text-[#6b7280] leading-relaxed">
          Last updated: June 10, 2026
        </p>
      </div>

      <Section title="Introduction">
        <p>
          PT AURA KODE NUSANTARA (&ldquo;<strong>Cukkr</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>our</strong>,&rdquo; or &ldquo;<strong>us</strong>&rdquo;)
          operates the Cukkr barbershop management platform, accessible at cukkr.com and its related subdomains (the &ldquo;<strong>Platform</strong>&rdquo;).
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.
        </p>
        <p>
          Cukkr is a barbershop management platform designed for barbershop owners, barbers, and their customers across Asia.
          We handle data in two contexts: (1) data of barbershop owners and barbers who use Cukkr to manage their shop,
          and (2) data of end-customers who book appointments or join walk-in queues through a barbershop&rsquo;s Cukkr page.
        </p>
        <p>
          By using the Platform, you agree to the collection and use of information in accordance with this policy.
          If you do not agree, please discontinue use of the Platform.
        </p>
      </Section>

      <Section title="Information We Collect">
        <p><strong>Account &amp; Profile Data.</strong> When you sign up, we collect your name, email, phone number, role, and optionally your photo and bio.</p>
        <p><strong>Barbershop Data.</strong> When you register a barbershop, we collect your shop name, address, description, logo, operating hours, timezone, and the services you offer.</p>
        <p><strong>Team Data.</strong> When you invite barbers to your shop, we collect their name, email, phone, role, and invitation status.</p>
        <p><strong>Customer Data.</strong> Barbershops may enter customer information such as name, contact details, notes, and the platform aggregates their booking history and visit metrics.</p>
        <p><strong>Booking &amp; Transaction Data.</strong> For each booking we record the type (walk-in or appointment), status, selected services and pricing, assigned barber, timestamps, and any notes or cancellation reasons.</p>
        <p><strong>Communications.</strong> If you contact us, we receive your name, email, and message content.</p>
        <p><strong>Automatically Collected Data.</strong> We collect standard server log data — such as IP address, browser type, device info, and pages visited — solely for security and operational purposes. We do not use third-party analytics, advertising trackers, or non-essential cookies.</p>
      </Section>

      <Section title="How We Use Your Information">
        <p>We use your information to operate and improve the Platform, authenticate users, process bookings, send notifications, generate business analytics, provide support, and comply with legal obligations. We do not use your data for advertising or profiling unrelated to the Platform.</p>
      </Section>

      <Section title="How We Share Your Information">
        <p>We do not sell, rent, or trade your personal information. We only share it:</p>
        <p><strong>Within your barbershop organization</strong> — with authorized team members you control.</p>
        <p><strong>With service providers</strong> — trusted partners (e.g., authentication, hosting) who process data on our instructions.</p>
        <p><strong>On public booking pages</strong> — your shop name, logo, address, and services are visible to customers at cukkr.com/[slug].</p>
        <p><strong>For legal reasons</strong> — when required by law or to protect our rights.</p>
        <p><strong>In business transfers</strong> — if Cukkr is acquired or merged, with prior notice to you.</p>
        <p>Any other sharing requires your explicit consent.</p>
      </Section>

      <Section title="Data Retention">
        <p>We keep your data only as long as needed:</p>
        <p><strong>Account data</strong> — while your account is active; deleted or anonymized upon account closure.</p>
        <p><strong>Booking &amp; transaction data</strong> — for the duration of your shop&rsquo;s active use of the Platform, plus a reasonable retention period for business records.</p>
        <p><strong>Server logs</strong> — retained temporarily for security and diagnostics, then deleted.</p>
        <p>Barbershop owners are responsible for managing their own customer data in line with applicable laws.</p>
      </Section>

      <Section title="Data Security">
        <p>
          We use encryption (HTTPS/TLS), passwordless authentication, rate limiting, and access controls to protect your data.
          We regularly review our infrastructure for security. However, no online system is 100% secure — we cannot guarantee absolute protection.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          Under Indonesia&rsquo;s Personal Data Protection Law (UU PDP), you have the right to access, correct, delete,
          and port your data; to withdraw consent; and to restrict or object to processing.{" "}
          To exercise these rights, contact us at{" "}
          <a href="mailto:hello@cukkr.com" className="text-[#1a1a1a] underline hover:text-[#ffc81e] transition-colors">
            hello@cukkr.com
          </a>
          . We&rsquo;ll respond within the legally required timeframe and may verify your identity first.
        </p>
      </Section>

      <Section title="Children&rsquo;s Privacy">
        <p>
          The Cukkr Platform is intended for use by barbershop owners and barbers who are of legal age to operate a business.
          We do not knowingly collect personal information from children under the age of 18.
          If you believe a child has provided us with personal information, please contact us immediately
          and we will take steps to delete such information.
        </p>
      </Section>

      <Section title="International Data Transfers">
        <p>
          Your information may be transferred to and processed on servers located outside of your country of residence.
          We take steps to ensure that any such transfers comply with applicable data protection laws and that
          your information remains protected in accordance with this Privacy Policy.
        </p>
      </Section>

      <Section title="Third-Party Links">
        <p>
          The Platform may contain links to third-party websites or services that are not owned or controlled by Cukkr.
          This Privacy Policy does not apply to those third-party services. We encourage you to review the privacy
          policies of any third-party services you interact with.
        </p>
      </Section>

      <Section title="Changes to This Privacy Policy">
        <p>
          We may update this policy from time to time. For material changes, we&rsquo;ll notify you via email
          and/or in-app notice, and post the revised version here. Continued use after changes means you accept the updated policy.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
          please contact us at:
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a]">Email</span>
            <a
              href="mailto:hello@cukkr.com"
              className="text-sm text-[#6b7280] hover:text-[#ffc81e] transition-colors"
            >
              hello@cukkr.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a]">Entity</span>
            <span className="text-sm text-[#6b7280]">
              PT AURA KODE NUSANTARA
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black tracking-[0.15em] uppercase text-[#1a1a1a]">Jurisdiction</span>
            <span className="text-sm text-[#6b7280]">
              Indonesia &mdash; tunduk pada Undang-Undang Perlindungan Data Pribadi (UU PDP) dan Undang-Undang Informasi dan Transaksi Elektronik (UU ITE).
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-t border-[#ffc81e] pt-12">
      <h2 className="text-2xl lg:text-3xl font-black tracking-tight uppercase text-[#1a1a1a]">
        {title}
      </h2>
      <div className="text-base text-[#6b7280] leading-relaxed max-w-3xl flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

