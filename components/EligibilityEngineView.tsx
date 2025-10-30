import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import careSourceLogo from '@/images/caresource.png';

interface EligibilityEngineViewProps {
  onStepChange?: (step: string) => void;
}

export default function EligibilityEngineView({ onStepChange }: EligibilityEngineViewProps) {
  const [mode, setMode] = useState<'rewards' | 'visits'>('rewards');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [section, setSection] = useState<'actions' | 'plan'>('actions');

  // Immunizations form state
  const [memberId, setMemberId] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [program, setProgram] = useState('OTC Network');

  const [immunizationType, setImmunizationType] = useState('Influenza');
  const [immunizationDate, setImmunizationDate] = useState('');
  const [immunizationLocation, setImmunizationLocation] = useState('Retail Pharmacy');
  const [immunizationProvider, setImmunizationProvider] = useState('CVS');
  const [notes, setNotes] = useState('');
  const [contactPhone] = useState('(555) 867-5309');
  const [contactEmail] = useState('member@example.com');
  const [deliveryMethod, setDeliveryMethod] = useState<'text' | 'email'>('text');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Initial step
    onStepChange?.('Welcome');
  }, []);

  useEffect(() => {
    if (!selectedAction) {
      onStepChange?.('Actions');
      return;
    }
    if (selectedAction !== 'Immunizations') {
      onStepChange?.(selectedAction);
      return;
    }
    if (step === 1) onStepChange?.('Confirm Eligibility');
    if (step === 2) onStepChange?.('Immunization Details');
    if (step === 3) onStepChange?.('Review & Submit');
    if (step === 4) onStepChange?.('Delivery Method');
    if (step === 5) onStepChange?.('Confirmation');
  }, [selectedAction, step, onStepChange]);

  const resetFlow = () => {
    setSelectedAction(null);
    setStep(1);
  };

  const ActionCard = ({ title, description, onClick }: { title: string; description: string; onClick: () => void; }) => (
    <button onClick={onClick} className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:border-blue-500 transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">{title}</div>
          <div className="text-xs text-gray-600 mt-1">{description}</div>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Safe area spacer for notch */}
      <div className="h-9" />

      {/* Top Bar */}
      <div className="bg-white text-gray-900 px-5 py-5 flex items-center justify-between shadow border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image src={careSourceLogo} alt="CareSource" width={96} height={96} />
        </div>
        <span className="text-[11px] font-semibold bg-purple-50 text-purple-700 px-2 py-1 rounded-md">Eligibility Engine</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 pb-24 bg-gray-50">
        {section === 'actions' && (
          <>
            {/* Welcome */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-4">
              <h1 className="text-xl font-bold text-gray-900">Welcome</h1>
              <p className="text-sm text-gray-600 mt-1">Find, qualify, and complete member actions with guided steps.</p>
            </div>

            {/* Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`py-2.5 rounded-lg text-sm font-semibold ${mode === 'rewards' ? 'bg-violet-600 text-white' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}
                  onClick={() => setMode('rewards')}
                >
                  Immediate Rewards
                </button>
                <button
                  className={`py-2.5 rounded-lg text-sm font-semibold ${mode === 'visits' ? 'bg-violet-600 text-white' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}
                  onClick={() => setMode('visits')}
                >
                  Health Visits
                </button>
              </div>
            </div>
          </>
        )}

        {/* Body Content by section */}
        {section === 'actions' && (mode === 'rewards' ? (
          <div className="space-y-4">
            <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">Report flu and COVID vaccines</div>
                  <div className="text-sm text-gray-600 mt-2 max-w-[34ch]">Report an eligible vaccine to earn your incentive.</div>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">$15 towards groceries</span>
              </div>
              <button onClick={() => { setSelectedAction('Immunizations'); setStep(1); }} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 font-semibold transition-colors">Report Immunization</button>
            </div>

            <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">Report pregnancy</div>
                  <div className="text-sm text-gray-600 mt-2 max-w-[34ch]">Let us know about a pregnancy to unlock benefits.</div>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">$10 towards diapers</span>
              </div>
              <button onClick={() => { setSelectedAction('Pregnancy'); setStep(1); }} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 font-semibold transition-colors">Report Pregnancy</button>
            </div>

            <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">Take Health Survey</div>
                  <div className="text-sm text-gray-600 mt-2 max-w-[34ch]">Complete a short survey to receive a reward.</div>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">$20 gym card</span>
              </div>
              <button onClick={() => { setSelectedAction('Health Survey'); setStep(1); }} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 font-semibold transition-colors">Start Survey</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">Annual Health Risk Assessment</div>
                  <div className="text-sm text-gray-600 mt-2 max-w-[34ch]">Complete your yearly assessment to identify risks and earn rewards.</div>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">$20</span>
              </div>
              <button onClick={() => { setSelectedAction('Annual Physical'); setStep(1); }} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 font-semibold transition-colors">Start Assessment</button>
            </div>

            <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">Schedule with your PCP</div>
                  <div className="text-sm text-gray-600 mt-2 max-w-[34ch]">Book and complete an annual checkup with your primary care physician.</div>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">$50</span>
              </div>
              <button onClick={() => { setSelectedAction('Dental Cleaning'); setStep(1); }} className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 font-semibold transition-colors">Schedule Appointment</button>
            </div>
          </div>
        ))}

        {section === 'plan' && (
          <div className="space-y-5">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold mb-1">CareSource Medicaid</h3>
              <p className="text-sm opacity-90">Cover what matters with extra benefits, rewards and tools for your family.</p>
            </div>

            {/* Tiles similar to site sections */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Rewards</h4>
                <p className="text-sm text-gray-600 mb-3">Get rewarded for healthy actions like vaccines, health surveys and checkups. Redeem instantly.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Immediate rewards</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">Gift cards</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">Online shopping</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Benefits & Services</h4>
                <p className="text-sm text-gray-600 mb-3">Extra benefits beyond medical care, including dental, vision, pregnancy support and programs for moms & kids.</p>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Diaper Reward and Grocery Card incentives</li>
                  <li>Dental, vision and pharmacy coverage</li>
                  <li>CareSource Life Services and job help</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Tools & Resources</h4>
                <p className="text-sm text-gray-600">Find a doctor, view prescriptions and manage your plan with CareSource MyLife.</p>
              </div>
            </div>

            {/* How to Enroll */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-3">How to Enroll</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>Apply via Georgia Gateway to check Medicaid or PeachCare for Kids eligibility.</li>
                <li>Call 1-855-202-0729 (TTY: 1-800-255-0056 or 711) to learn about CareSource benefits.</li>
                <li>Enroll in Georgia Families and choose CareSource as your health plan.</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Flow Modal (bottom sheet style) */}
      {selectedAction && (
        <>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={resetFlow} />

          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[80%] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-bold text-gray-900">{selectedAction}</div>
                <button onClick={resetFlow} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <div key={s} className={`h-1.5 rounded-full ${step >= s ? 'bg-blue-600' : 'bg-gray-200'} ${s === 1 ? 'w-16' : s === 2 ? 'w-24' : 'w-16'}`} />
                ))}
              </div>

              {/* Steps for Immunizations. Others show a placeholder. */}
              {selectedAction !== 'Immunizations' ? (
                <div className="text-sm text-gray-700">
                  This action is a mock. Select Immunizations to view the full guided flow.
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Confirm Eligibility</h3>
                      <p className="text-sm text-gray-600 mb-4">Enter member info to verify eligibility.</p>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Member ID</label>
                          <input value={memberId} onChange={(e) => setMemberId(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 123456789" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">DOB (MM)</label>
                            <input value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="07" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">DOB (DD)</label>
                            <input value={dobDay} onChange={(e) => setDobDay(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="21" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">DOB (YYYY)</label>
                            <input value={dobYear} onChange={(e) => setDobYear(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="1985" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Program</label>
                          <select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                            <option>OTC Network</option>
                            <option>Transportation</option>
                            <option>Healthy Foods</option>
                          </select>
                        </div>
                        <button onClick={() => setStep(2)} className="mt-1 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold py-2.5 px-4 hover:bg-blue-700 transition">
                          Verify Eligibility
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Immunization Details</h3>
                      <p className="text-sm text-gray-600 mb-4">Tell us about the vaccine you received.</p>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
                          <select value={immunizationType} onChange={(e) => setImmunizationType(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                            <option>Influenza</option>
                            <option>COVID-19</option>
                            <option>Pneumococcal</option>
                            <option>Hepatitis B</option>
                            <option>Shingles</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Date Received</label>
                          <input type="date" value={immunizationDate} onChange={(e) => setImmunizationDate(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Location Type</label>
                            <select value={immunizationLocation} onChange={(e) => setImmunizationLocation(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                              <option>Retail Pharmacy</option>
                              <option>Clinic</option>
                              <option>Doctor's Office</option>
                              <option>Community Event</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Provider</label>
                            <input value={immunizationProvider} onChange={(e) => setImmunizationProvider(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. CVS" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Notes (optional)</label>
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Lot number, uploader, etc." />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold">Back</button>
                          <button onClick={() => setStep(3)} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Continue</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Review & Submit</h3>
                      <p className="text-sm text-gray-600 mb-4">Confirm your details and submit the action.</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-gray-500">Member ID</div>
                            <div className="font-semibold text-gray-900">{memberId || '—'}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">DOB</div>
                            <div className="font-semibold text-gray-900">{[dobMonth, dobDay, dobYear].filter(Boolean).join('/') || '—'}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Program</div>
                            <div className="font-semibold text-gray-900">{program}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Type</div>
                            <div className="font-semibold text-gray-900">{immunizationType}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Date</div>
                            <div className="font-semibold text-gray-900">{immunizationDate || '—'}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Location</div>
                            <div className="font-semibold text-gray-900">{immunizationLocation}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Provider</div>
                            <div className="font-semibold text-gray-900">{immunizationProvider}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-gray-500">Notes</div>
                            <div className="font-semibold text-gray-900 break-words">{notes || '—'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold">Back</button>
                        <button onClick={() => setStep(4)} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Continue</button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Delivery Method</h3>
                      <p className="text-sm text-gray-600 mb-4">Choose how you want to receive your reward link.</p>
                      <div className="space-y-3">
                        <label className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer ${deliveryMethod==='text' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">Text message</div>
                            <div className="text-xs text-gray-600">{contactPhone}</div>
                          </div>
                          <input type="radio" name="delivery" className="h-4 w-4" checked={deliveryMethod==='text'} onChange={() => setDeliveryMethod('text')} />
                        </label>
                        <label className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer ${deliveryMethod==='email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">Email</div>
                            <div className="text-xs text-gray-600">{contactEmail}</div>
                          </div>
                          <input type="radio" name="delivery" className="h-4 w-4" checked={deliveryMethod==='email'} onChange={() => setDeliveryMethod('email')} />
                        </label>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button onClick={() => setStep(3)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold">Back</button>
                        <button onClick={() => { setStep(5); setShowSuccess(true); }} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold">Submit Action</button>
                      </div>
                    </div>
                  )}

                  {step === 5 && showSuccess && (
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Success</h3>
                      <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm">
                        We will activate your rewards card in your wallet. Click the link that has been {deliveryMethod === 'text' ? 'texted' : 'emailed'} to you to complete activation.
                      </div>
                      <div className="flex items-center justify-end mt-4">
                        <button onClick={() => { setShowSuccess(false); resetFlow(); }} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Done</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Bottom Segmented Toggle */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-center sticky bottom-0 z-20">
        <div className="relative inline-flex items-center rounded-full bg-gray-200/70 shadow-inner p-1 select-none">
          <span
            className={`absolute top-1 bottom-1 w-40 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
              section === 'actions' ? 'translate-x-1' : 'translate-x-[10.25rem]'
            }`}
            aria-hidden
          />
          <button
            className={`relative z-10 w-40 px-4 py-2 text-xs font-extrabold tracking-wide rounded-full ${
              section === 'actions' ? 'text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setSection('actions')}
          >
            Actions
          </button>
          <button
            className={`relative z-10 w-40 px-4 py-2 text-xs font-extrabold tracking-wide rounded-full ${
              section === 'plan' ? 'text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setSection('plan')}
          >
            Plan Information
          </button>
        </div>
      </div>
    </div>
  );
}
