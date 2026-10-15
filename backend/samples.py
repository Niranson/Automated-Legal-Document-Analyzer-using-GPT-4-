"""
Pre-loaded realistic legal document samples for Experiment 5:
Automated Legal Document Analyzer using GPT-4.
Matches types described in section 1:
- Employment Agreement
- Non-Disclosure Agreement (NDA)
- Service Agreement
- Rental Agreement
- Sales Agreement
"""

SAMPLES = {
    "employment": {
        "title": "Employment Agreement (Full-Time Senior Software Engineer)",
        "type": "Employment Agreement",
        "description": "Standard full-time employment contract outlining duties, compensation, confidentiality, and termination.",
        "content": """EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into and made effective as of July 1, 2026 ("Effective Date"), by and between:

PARTIES:
1. TechNova Solutions Inc., a Delaware corporation having its principal office at 500 Silicon Boulevard, San Francisco, CA ("Employer" or "Company"), and
2. Alex Rivera, an individual residing at 742 Evergreen Terrace, San Jose, CA ("Employee").

1. PURPOSE & APPOINTMENT
The Company hereby employs Alex Rivera in the position of Lead Systems Architect, and the Employee hereby accepts such employment, subject to the terms and conditions set forth herein.

2. TERM & DURATION
The term of employment under this Agreement shall commence on July 1, 2026, and shall continue for an initial period of 12 months, after which it will automatically convert to at-will employment unless terminated earlier in accordance with Section 6.

3. COMPENSATION & PAYMENT TERMS
(a) Base Salary: The Company shall pay the Employee a monthly gross salary of $12,500 USD (equivalent to $150,000 annually), payable semi-monthly on the 15th and last business day of each month.
(b) Performance Bonus: The Employee shall be eligible for an annual performance bonus of up to 15% of the base salary, contingent on meeting key performance indicators (KPIs) established by the Board.
(c) Reimbursements: The Company will reimburse all reasonable business expenses within 14 days of invoice submission.

4. KEY DUTIES & OBLIGATIONS
(a) Employee Obligations:
- The Employee must perform assigned duties faithfully, diligently, and to the best of their skill and ability.
- The Employee shall devote full working time, attention, and energies to the business of the Company.
- The Employee shall comply with all corporate policies, security protocols, and ethical codes of conduct.
(b) Employer Obligations:
- The Company shall provide a safe work environment, modern computing equipment, and health insurance coverage beginning on the Effective Date.

5. CONFIDENTIALITY & PROPRIETARY INFORMATION
The Employee agrees that during the period of employment and for three (3) years thereafter, the Employee shall maintain strict confidentiality regarding all proprietary information, trade secrets, software codebases, customer lists, and financial records obtained during employment. The Employee shall not disclose such information to any third party without prior written authorization from the Chief Executive Officer.

6. INTELLECTUAL PROPERTY RIGHTS
All inventions, software code, algorithms, documentation, designs, and derivative works created, conceived, or reduced to practice by the Employee, either solely or jointly, during the period of employment and related to the Company's current or prospective business, shall be the sole and exclusive property of TechNova Solutions Inc. ("Work Made for Hire").

7. TERMINATION & NOTICE
(a) Termination for Convenience: Either party may terminate this Agreement without cause by providing at least thirty (30) days prior written notice to the other party.
(b) Termination for Cause: The Company may terminate employment immediately and without prior notice in the event of gross negligence, fraud, material breach of confidentiality, or conviction of a felony.
(c) Severance: Upon termination without cause by the Company, the Employee shall receive two (2) months of continued base salary.

8. INDEMNIFICATION & LIABILITY
The Company agrees to indemnify and hold harmless the Employee against liabilities, claims, and expenses arising out of actions performed within the lawful scope of the Employee's official duties, excluding willful misconduct or intentional criminal acts.

9. DISPUTE RESOLUTION & GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles. Any dispute arising under this Agreement shall be resolved first through good-faith mediation in San Francisco, CA. If mediation fails within 30 days, disputes shall be settled by binding arbitration administered by the American Arbitration Association (AAA).

IN WITNESS WHEREOF, the parties hereto have executed this Employment Agreement as of the date first written above.

Employer: TechNova Solutions Inc.
By: Sarah Jenkins, VP of Human Resources

Employee:
Alex Rivera
"""
    },

    "nda": {
        "title": "Mutual Non-Disclosure Agreement (M-NDA)",
        "type": "Non-Disclosure Agreement (NDA)",
        "description": "Bilateral confidential disclosure agreement between two corporate entities exploring a strategic partnership.",
        "content": """MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is executed on August 15, 2026 ("Effective Date"), by and between:

PARTIES:
1. Apex BioTech Ltd., a biotechnology company located at 12 Cambridge Science Park, Boston, MA ("Disclosing Party / Receiving Party"), and
2. Quantum Pharma Corp., a pharmaceutical enterprise located at 88 Horizon Way, Basel, Switzerland ("Disclosing Party / Receiving Party").

1. PURPOSE
The parties wish to explore a potential joint research and development venture involving genetic synthesis algorithms and drug discovery pipelines ("Permitted Purpose").

2. DURATION
This Agreement shall commence on August 15, 2026, and shall remain in effect for a period of twenty-four (24) months. The confidentiality obligations herein shall survive for five (5) years following the termination or expiration of this Agreement.

3. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" refers to any non-public proprietary data, trade secrets, chemical formulations, clinical trial data, patents, software algorithms, customer lists, and business strategies disclosed by either party in written, electronic, or oral form.

4. KEY OBLIGATIONS & RESTRICTIONS
(a) The Receiving Party shall hold all Confidential Information in strict confidence and protect it using at least the degree of care it exercises with its own proprietary data, but no less than reasonable care.
(b) The Receiving Party shall use Confidential Information solely for the Permitted Purpose.
(c) The Receiving Party shall restrict disclosure solely to officers, employees, and legal counsel who have a strict need-to-know and are bound by confidentiality covenants no less stringent than those herein.

5. EXCLUSIONS FROM CONFIDENTIALITY
Confidentiality obligations shall not apply to information that:
(a) is or becomes publicly available without breach of this Agreement;
(b) was already known to the Receiving Party prior to disclosure;
(c) is independently developed without reference to the Disclosing Party's information;
(d) is required to be disclosed by applicable court order or statute, provided prompt written notice is given.

6. RETURN OR DESTRUCTION OF MATERIALS
Upon written request or termination of this Agreement, the Receiving Party must immediately return or certify in writing the complete destruction of all documents, disks, and electronic copies containing Confidential Information within fourteen (14) calendar days.

7. PAYMENT & REMEDIES
No monetary payment is exchanged under this Agreement. The parties acknowledge that unauthorized disclosure of Confidential Information causes irreparable harm for which monetary damages alone would be inadequate. Therefore, the Disclosing Party shall be entitled to seek injunctive relief and specific performance in addition to all other legal remedies.

8. TERMINATION
Either party may terminate discussions regarding the Permitted Purpose upon ten (10) business days written notice. Confidentiality covenants survive termination as set forth in Section 2.

9. GOVERNING LAW & JURISDICTION
This Agreement shall be construed in accordance with the substantive laws of the Commonwealth of Massachusetts. The state and federal courts situated in Suffolk County, Massachusetts, shall have exclusive jurisdiction over all claims.
"""
    },

    "service": {
        "title": "Software Development Service Agreement",
        "type": "Service Agreement",
        "description": "Standard B2B IT consultancy and software delivery agreement with milestones, payment, and IP assignment.",
        "content": """MASTER SOFTWARE DEVELOPMENT SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of September 1, 2026 ("Effective Date"), by and between:

PARTIES:
1. Helios Retail Systems LLC, an enterprise corporation organized under the laws of New York ("Client"), and
2. CloudCraft Digital Studio Pvt. Ltd., an enterprise software development agency located in Bengaluru, India ("Service Provider").

1. PURPOSE & SCOPE OF SERVICES
Client engages Service Provider to design, architect, develop, and deploy an automated multi-tenant cloud inventory management system ("Software Platform") in accordance with the Statement of Work (SOW-01).

2. DURATION
The project duration is twelve (12) months, commencing September 1, 2026, and concluding August 31, 2027, unless extended by mutual written consent or terminated pursuant to Section 6.

3. PAYMENT TERMS & SCHEDULE
(a) Total Contract Value: $600,000 USD (equivalent to ₹50,000,000 INR milestone equivalent), structured as:
- Initial Advance / Retainer: $100,000 USD upon execution of Agreement.
- Monthly Milestone Installments: $40,000 USD per month for 10 months upon verified completion of sprint deliverables.
- Final Acceptance Fee: $100,000 USD upon successful deployment and UAT sign-off.
(b) Payment Timing: Invoices must be settled within thirty (30) days of receipt via direct wire transfer.
(c) Late Payment: Overdue invoices accrue interest at 1.5% per month or the maximum permissible rate by law.

4. KEY OBLIGATIONS
(a) Service Provider Obligations:
- Deliver software strictly according to specifications, architecture diagrams, and quality benchmarks.
- Provide bi-weekly progress reports and sprint demonstrations.
- Ensure 99.9% uptime and resolve critical severity-1 bugs within 4 hours during the warranty period.
(b) Client Obligations:
- Provide timely access to APIs, test databases, and stakeholder feedback within 5 working days of request.
- Make scheduled milestone payments on time.

5. INTELLECTUAL PROPERTY & OWNERSHIP
All custom code, user interfaces, database schemas, and documentation created under this Agreement shall belong solely to Client upon full payment of fees. Service Provider retains ownership of its pre-existing core libraries and background tools, granting Client a perpetual, royalty-free, worldwide license.

6. TERMINATION
(a) For Convenience: Client may terminate this agreement at any time upon thirty (30) days written notice, subject to paying for all work completed up to the termination date.
(b) For Cause: Either party may terminate immediately upon written notice if the other party commits a material breach and fails to cure such breach within fifteen (15) days of receiving written notification.

7. CONFIDENTIALITY
Both parties agree to hold all technical architectures, customer data, and commercial pricing confidential for a period of five (5) years from disclosure.

8. LIMITATION OF LIABILITY
Neither party shall be liable for indirect, incidental, or consequential damages. The aggregate liability of either party under this Agreement shall not exceed the total fees actually paid to Service Provider in the preceding twelve (12) months.

9. GOVERNING LAW & ARBITRATION
This Agreement shall be governed by the laws of the State of New York. Any dispute shall be finally settled by arbitration conducted in New York City under the Commercial Arbitration Rules of the American Arbitration Association.
"""
    },

    "rental": {
        "title": "Commercial Property Rental & Lease Agreement",
        "type": "Rental Agreement",
        "description": "Commercial office lease contract defining rent, security deposit, maintenance, and leasehold terms.",
        "content": """COMMERCIAL LEASE & RENTAL AGREEMENT

This Commercial Lease Agreement ("Lease") is executed on October 1, 2026, by and between:

PARTIES:
1. Metropolis Commercial Real Estate Holdings LLC ("Landlord"), and
2. Nova Dynamics Technologies Corp. ("Tenant").

1. PURPOSE & PREMISES
Landlord leases to Tenant, and Tenant rents from Landlord, Suite 400 comprising approximately 6,500 square feet of office space located at 100 Financial Center, Chicago, IL ("Leased Premises"), exclusively for lawful corporate office and technology operations.

2. DURATION & LEASE TERM
The lease term shall be for a fixed duration of thirty-six (36) months, commencing on October 1, 2026 ("Commencement Date"), and terminating on September 30, 2029 ("Expiration Date"). Tenant holds an option to renew for an additional 24 months with 90 days written advance notice.

3. RENT & PAYMENT TERMS
(a) Base Monthly Rent: Tenant shall pay Landlord a base rental amount of $18,000 USD per month.
(b) Payment Schedule: Rent is due strictly on or before the 1st day of each calendar month.
(c) Security Deposit: Concurrently with execution, Tenant shall deposit $36,000 USD as security for full performance.
(d) Late Charge: Rent unpaid after the 5th calendar day will incur a late fee of 5% of the overdue balance.

4. KEY OBLIGATIONS
(a) Tenant Obligations:
- Maintain the interior of the premises in clean, safe, and sanitary condition.
- Maintain commercial general liability insurance with limits not less than $2,000,000.
- Comply with all local building codes and environmental safety ordinances.
(b) Landlord Obligations:
- Maintain structural foundations, exterior walls, HVAC central units, roof, and common elevators.
- Provide continuous water, electrical supply, and lobby security.

5. TERMINATION & DEFAULT
(a) Default: Non-payment of rent for ten (10) days after written notice constitutes immediate default.
(b) Notice to Vacate: In case of non-curable default, Landlord may provide ten (10) days written notice to vacate the premises.
(c) Early Termination: Tenant may terminate early only upon payment of an early termination fee equivalent to three (3) months' base rent plus surrender of security deposit.

6. DAMAGE, DESTRUCTION & LIABILITY
Landlord shall not be liable for damage or loss to Tenant's personal property unless caused directly by Landlord's gross negligence. In the event of catastrophic structural damage rendering premises uninhabitable, rent shall abate proportionately.

7. GOVERNING LAW
This Lease shall be governed by and interpreted under the laws of the State of Illinois. Jurisdiction and venue shall lie exclusively in the Cook County Circuit Court.
"""
    },

    "sales": {
        "title": "Commercial Equipment Sales & Purchase Agreement",
        "type": "Sales Agreement",
        "description": "Goods sales contract covering delivery terms, warranties, inspection periods, and title transfer.",
        "content": """COMMERCIAL SALES AND PURCHASE AGREEMENT

This Sales Agreement ("Agreement") is made and entered into on November 10, 2026, by and between:

PARTIES:
1. Vanguard Industrial Robotics Inc., having its registered office in Detroit, MI ("Seller"), and
2. Pacific Manufacturing Group Ltd., having its operations in Seattle, WA ("Buyer").

1. PURPOSE
Seller agrees to sell, transfer, and deliver to Buyer, and Buyer agrees to purchase and accept, four (4) automated robotic assembly units, Model V-900 ("Equipment").

2. DURATION & DELIVERY SCHEDULE
Seller shall deliver the Equipment to Buyer's facility in Seattle, WA within ninety (90) days of execution, with a mandatory delivery deadline of February 10, 2027.

3. PURCHASE PRICE & PAYMENT TERMS
(a) Total Purchase Price: $450,000 USD.
(b) Payment Milestones:
- 30% ($135,000) payable upon signing of this Agreement.
- 50% ($225,000) payable upon bill of lading confirmation of shipment.
- 20% ($90,000) payable upon final inspection and operational sign-off.
(c) Invoices are payable within twenty (20) calendar days of generation.

4. KEY OBLIGATIONS
(a) Seller Obligations:
- Manufacture and configure Equipment strictly to technical specifications in Exhibit A.
- Provide on-site installation engineers and 40 hours of operator training.
- Warranty the Equipment against manufacturing defects for twenty-four (24) months.
(b) Buyer Obligations:
- Prepare installation foundation and required electrical specifications prior to delivery.
- Inspect delivered equipment within ten (10) business days of delivery ("Inspection Period").

5. TITLE & RISK OF LOSS
Title and risk of loss shall transfer to Buyer upon delivery to Buyer's designated facility (FOB Destination).

6. TERMINATION
Either party may terminate this Agreement if the other party files for bankruptcy, dissolves, or fails to cure a material breach within twenty (20) days of written notice.

7. GOVERNING LAW & JURISDICTION
This Agreement shall be governed by the Uniform Commercial Code (UCC) as enacted in the State of Michigan.
"""
    }
}
