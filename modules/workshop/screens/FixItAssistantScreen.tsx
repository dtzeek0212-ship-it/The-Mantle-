import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const FixItAssistantScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const context = route.params?.context || 'General Repair';

    const [isScanning, setIsScanning] = useState(true);
    const [partIdentified, setPartIdentified] = useState(false);

    // Plumbing Specific States
    const isPlumbing = context.toLowerCase().includes('plumbing') || context.toLowerCase().includes('water') || context.toLowerCase().includes('copper') || context.toLowerCase().includes('drain');
    const isBlackWater = context.toLowerCase().includes('drain') || context.toLowerCase().includes('sewer') || context.toLowerCase().includes('toilet');
    const isHotWater = context.toLowerCase().includes('water heater') || context.toLowerCase().includes('hot water');
    const isSoldering = context.toLowerCase().includes('solder') || context.toLowerCase().includes('copper') || context.toLowerCase().includes('sweating');

    // Verification States
    const [isolationChecked, setIsolationChecked] = useState(false);
    const [bleedChecked, setBleedChecked] = useState(false);
    const [containmentChecked, setContainmentChecked] = useState(false);

    // Electrical Specific States
    const isElectrical = context.toLowerCase().includes('electrical') || context.toLowerCase().includes('wire') || context.toLowerCase().includes('outlet') || context.toLowerCase().includes('breaker') || context.toLowerCase().includes('light');

    const [loadTestChecked, setLoadTestChecked] = useState(false);
    const [killSwitchChecked, setKillSwitchChecked] = useState(false);
    const [activeVerificationChecked, setActiveVerificationChecked] = useState(false);

    // Red-Flag Logic
    const [scorchChecked, setScorchChecked] = useState(false);
    const [buzzingChecked, setBuzzingChecked] = useState(false);
    const [brittleChecked, setBrittleChecked] = useState(false);

    const hasRedFlag = scorchChecked || buzzingChecked || brittleChecked;

    // HVAC Specific States
    const isHVAC = context.toLowerCase().includes('hvac') || context.toLowerCase().includes('ac') || context.toLowerCase().includes('a/c') || context.toLowerCase().includes('air condition') || context.toLowerCase().includes('furnace') || context.toLowerCase().includes('heater') || context.toLowerCase().includes('thermostat');
    const isCooling = context.toLowerCase().includes('ac') || context.toLowerCase().includes('a/c') || context.toLowerCase().includes('air condition');
    const hvacTheme = isCooling ? '#00BCD4' : '#FF5722'; // Frost Blue vs Heat Wave Red

    const [killSwitchSlid, setKillSwitchSlid] = useState(false);
    const [carbonChecked, setCarbonChecked] = useState(false);
    const [gasSmellChecked, setGasSmellChecked] = useState(false);
    const [freezeChecked, setFreezeChecked] = useState(false);

    // Structural Specific States
    const isStructural = context.toLowerCase().includes('structural') || context.toLowerCase().includes('framing') || context.toLowerCase().includes('drywall') || context.toLowerCase().includes('wall') || context.toLowerCase().includes('foundation') || context.toLowerCase().includes('masonry') || context.toLowerCase().includes('stud');

    const [loadBearingChecked, setLoadBearingChecked] = useState(false);
    const [utilityScanChecked, setUtilityScanChecked] = useState(false);
    const [ppeChecked, setPpeChecked] = useState(false);

    const [shoringChecked, setShoringChecked] = useState(false);
    const [foundationChecked, setFoundationChecked] = useState(false);

    const [safetyChecked, setSafetyChecked] = useState(false);
    const [step, setStep] = useState(1);

    // Mock scan complete after 2s
    React.useEffect(() => {
        if (isScanning) {
            const timer = setTimeout(() => {
                setIsScanning(false);
                setPartIdentified(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isScanning]);

    // Safety First Screen
    if (!safetyChecked) {
        if (isPlumbing) {
            return (
                <View style={[styles.safetyContainer, { backgroundColor: '#121212' }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.plumbingHeader}>
                            <Icon name="Droplets" size={48} color="#03A9F4" />
                            <Text style={styles.plumbingTitle}>WATER-FIRST PROTOCOL</Text>
                            <Text style={styles.warningSub}>Context: {context.toUpperCase()}</Text>
                        </View>

                        {/* High-Stakes Warnings */}
                        {isBlackWater && (
                            <View style={styles.hazardBanner}>
                                <Icon name="Skull" size={24} color="#121212" />
                                <View style={styles.hazardTextCol}>
                                    <Text style={styles.hazardTitle}>BLACK WATER ALERT</Text>
                                    <Text style={styles.hazardDesc}>Raw sewage contains immediate-illness pathogens. Wear heavy-duty nitrile gloves and eye protection. Do not touch face until hands are sanitized.</Text>
                                </View>
                            </View>
                        )}
                        {isHotWater && (
                            <View style={[styles.hazardBanner, { backgroundColor: '#FF9800' }]}>
                                <Icon name="Thermometer" size={24} color="#121212" />
                                <View style={styles.hazardTextCol}>
                                    <Text style={styles.hazardTitle}>SCALD PROTECTION</Text>
                                    <Text style={styles.hazardDesc}>Verify water temperature. If the tank was recently active, wait 2 hours to cool to avoid Grade 2 burns.</Text>
                                </View>
                            </View>
                        )}
                        {isSoldering && (
                            <View style={[styles.hazardBanner, { backgroundColor: '#F44336' }]}>
                                <Icon name="Flame" size={24} color="#121212" />
                                <View style={styles.hazardTextCol}>
                                    <Text style={styles.hazardTitle}>FIRE WATCH</Text>
                                    <Text style={styles.hazardDesc}>Clear all flammable debris. Position fire extinguisher within arm's reach. Use heat shield near wood studs.</Text>
                                </View>
                            </View>
                        )}

                        {/* Critical System Check */}
                        <View style={styles.checklistCard}>
                            <Text style={styles.checklistTitle}>CRITICAL SYSTEM CHECK</Text>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setIsolationChecked(!isolationChecked)}>
                                <View style={[styles.checkbox, isolationChecked && styles.checkboxActive]}>
                                    {isolationChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE ISOLATION CHECK</Text>
                                    <Text style={styles.checkDesc}>Have you fully closed the local shut-off valve? If seized, have you shut off the Main?</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setBleedChecked(!bleedChecked)}>
                                <View style={[styles.checkbox, bleedChecked && styles.checkboxActive]}>
                                    {bleedChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE RESIDUAL BLEED</Text>
                                    <Text style={styles.checkDesc}>Open lowest faucet to bleed pressure. Do not break a seal until water stops flowing.</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setContainmentChecked(!containmentChecked)}>
                                <View style={[styles.checkbox, containmentChecked && styles.checkboxActive]}>
                                    {containmentChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>CONTAINMENT READINESS</Text>
                                    <Text style={styles.checkDesc}>Do you have a 5-gal bucket and a sacrificial towel directly under the work zone?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Toolbox Audit */}
                        <View style={styles.checklistCard}>
                            <Text style={styles.checklistTitle}>THE TOOLBOX AUDIT</Text>
                            <Text style={styles.auditItem}>• The Grippers (10" Pipe Wrench, Knipex)</Text>
                            <Text style={styles.auditItem}>• The Sealer (Oatey Blue Monster PTFE)</Text>
                            <Text style={styles.auditItem}>• The Specialty (Basin Wrench)</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.startProjectBtn, (!isolationChecked || !containmentChecked) && styles.startProjectBtnDisabled]}
                            onPress={() => setSafetyChecked(true)}
                            disabled={!isolationChecked || !containmentChecked}
                        >
                            <Text style={styles.startProjectBtnText}>
                                {(!isolationChecked || !containmentChecked) ? 'COMPLETE CHECKS TO START' : 'SYSTEMS SECURED - START PROJECT'}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }

        if (isElectrical) {
            return (
                <View style={[styles.safetyContainer, { backgroundColor: '#121212' }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.plumbingHeader, { borderBottomColor: colors.workshopAccent }]}>
                            <Icon name="Zap" size={48} color={colors.workshopAccent} />
                            <Text style={[styles.plumbingTitle, { color: colors.workshopAccent }]}>LIFE-SAFETY PROTOCOL</Text>
                            <Text style={styles.warningSub}>Context: {context.toUpperCase()}</Text>
                        </View>

                        {/* Arc & Spark Warnings */}
                        <View style={[styles.hazardBanner, { backgroundColor: '#1E1E1E', borderColor: colors.workshopAccent, borderWidth: 1 }]}>
                            <View style={styles.hazardTextCol}>
                                <Text style={[styles.hazardTitle, { color: colors.workshopAccent }]}>THE GROUNDING RULE</Text>
                                <Text style={[styles.hazardDesc, { color: '#CCC' }]}>Never clip or remove a grounding wire (green/bare copper). It prevents the metal box or tool from becoming live during a fault.</Text>
                            </View>
                        </View>

                        <View style={[styles.hazardBanner, { backgroundColor: '#1E1E1E', borderColor: colors.workshopAccent, borderWidth: 1 }]}>
                            <View style={styles.hazardTextCol}>
                                <Text style={[styles.hazardTitle, { color: colors.workshopAccent }]}>ALUMINUM ALERT</Text>
                                <Text style={[styles.hazardDesc, { color: '#CCC' }]}>If you see silver-colored wiring, stop. Aluminum requires CO/ALR rated devices and paste. Mixing is a major fire hazard.</Text>
                            </View>
                        </View>

                        {/* Red Flag Stop Logic */}
                        <View style={[styles.checklistCard, { borderColor: '#F44336', borderWidth: 2 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Icon name="AlertTriangle" size={20} color="#F44336" />
                                <Text style={[styles.checklistTitle, { color: '#F44336', marginBottom: 0, marginLeft: 8 }]}>RED-FLAG AUDIT</Text>
                            </View>
                            <Text style={[styles.checkDesc, { marginBottom: 16 }]}>Do you detect any of the following?</Text>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setScorchChecked(!scorchChecked)}>
                                <View style={[styles.checkbox, scorchChecked && { backgroundColor: '#F44336', borderColor: '#F44336' }]}>
                                    {scorchChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>Scorch marks or melted insulation</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setBuzzingChecked(!buzzingChecked)}>
                                <View style={[styles.checkbox, buzzingChecked && { backgroundColor: '#F44336', borderColor: '#F44336' }]}>
                                    {buzzingChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>Buzzing or humming from outlet/breaker</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setBrittleChecked(!brittleChecked)}>
                                <View style={[styles.checkbox, brittleChecked && { backgroundColor: '#F44336', borderColor: '#F44336' }]}>
                                    {brittleChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>Brittle insulation that cracks when touched</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Critical System Check */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: colors.workshopAccent }]}>THREE-POINT VERIFICATION</Text>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setLoadTestChecked(!loadTestChecked)}>
                                <View style={[styles.checkbox, loadTestChecked && styles.checkboxActive]}>
                                    {loadTestChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>LOAD TEST</Text>
                                    <Text style={styles.checkDesc}>Turn on the light or appliance. Verify it has power before turning off the breaker.</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setKillSwitchChecked(!killSwitchChecked)}>
                                <View style={[styles.checkbox, killSwitchChecked && styles.checkboxActive]}>
                                    {killSwitchChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE KILL SWITCH</Text>
                                    <Text style={styles.checkDesc}>Identify the correct breaker and switch to "Hard Off". Verify the light lost power.</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setActiveVerificationChecked(!activeVerificationChecked)}>
                                <View style={[styles.checkbox, activeVerificationChecked && styles.checkboxActive]}>
                                    {activeVerificationChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>ACTIVE VERIFICATION</Text>
                                    <Text style={styles.checkDesc}>Use a Non-Contact Voltage Tester to check the wire. Never trust the label.</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Toolbox Audit */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: colors.workshopAccent }]}>THE INSULATED LOADOUT</Text>
                            <Text style={styles.auditItem}>• The Testers: Klein NCVT & Multimeter</Text>
                            <Text style={styles.auditItem}>• The Cutters: Insulated Wire Strippers & Lineman's</Text>
                            <Text style={styles.auditItem}>• The Protection: Electrical Tape & 1000V Screwdrivers</Text>
                        </View>

                        {hasRedFlag ? (
                            <TouchableOpacity style={[styles.startProjectBtn, { backgroundColor: '#F44336' }]} onPress={() => navigation.navigate('ProConnect')}>
                                <Icon name="PhoneCall" size={20} color="#121212" />
                                <Text style={[styles.startProjectBtnText, { marginLeft: 8 }]}>RED FLAG DETECTED - CALL A PRO</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.startProjectBtn, { backgroundColor: colors.workshopAccent }, (!loadTestChecked || !killSwitchChecked || !activeVerificationChecked) && styles.startProjectBtnDisabled]}
                                onLongPress={() => {
                                    if (loadTestChecked && killSwitchChecked && activeVerificationChecked) {
                                        setSafetyChecked(true);
                                    }
                                }}
                                delayLongPress={800}
                                disabled={!loadTestChecked || !killSwitchChecked || !activeVerificationChecked}
                            >
                                <Text style={styles.startProjectBtnText}>
                                    {(!loadTestChecked || !killSwitchChecked || !activeVerificationChecked) ? 'COMPLETE THREE-POINT CHECK' : 'HOLD TO CONFIRM ISOLATION'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            );
        }

        if (isHVAC) {
            // High-Stakes Emergency Block
            if (gasSmellChecked) {
                return (
                    <View style={[styles.safetyContainer, { backgroundColor: '#F44336' }]}>
                        <View style={styles.warningHeader}>
                            <Icon name="Skull" size={64} color="#121212" />
                            <Text style={styles.warningTitle}>CRITICAL EMERGENCY</Text>
                            <Text style={styles.warningSub}>NATURAL GAS / CO DETECTED</Text>
                        </View>
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>1. EXIT THE PREMISES IMMEDIATELY.</Text>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>2. DO NOT TOUCH LIGHT SWITCHES OR PHONES INDOORS.</Text>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>3. LEAVE DOORS OPEN FOR VENTILATION.</Text>
                        </View>
                        <TouchableOpacity style={[styles.proBtn, { backgroundColor: '#121212' }]} onPress={() => navigation.navigate('ProConnect')}>
                            <Icon name="PhoneCall" size={24} color="#F44336" />
                            <Text style={[styles.proBtnText, { color: '#F44336', fontSize: 20 }]}>CALL 911 / GAS COMPANY</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

            return (
                <View style={[styles.safetyContainer, { backgroundColor: '#121212' }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.plumbingHeader, { borderBottomColor: hvacTheme }]}>
                            <Icon name={isCooling ? "Wind" : "Flame"} size={48} color={hvacTheme} />
                            <Text style={[styles.plumbingTitle, { color: hvacTheme }]}>CLIMATOLOGY PROTOCOL</Text>
                            <Text style={styles.warningSub}>Context: {context.toUpperCase()}</Text>
                        </View>

                        {/* High-Stakes Troubleshooting */}
                        <View style={[styles.checklistCard, { borderColor: '#FF9800', borderWidth: 2 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Icon name="Activity" size={20} color="#FF9800" />
                                <Text style={[styles.checklistTitle, { color: '#FF9800', marginBottom: 0, marginLeft: 8 }]}>DIAGNOSTIC RED-FLAGS</Text>
                            </View>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setGasSmellChecked(true)}>
                                <View style={[styles.checkbox, gasSmellChecked && { backgroundColor: '#F44336', borderColor: '#F44336' }]} />
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>I smell a "rotten egg" or gas odor.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setFreezeChecked(!freezeChecked)}>
                                <View style={[styles.checkbox, freezeChecked && { backgroundColor: '#00BCD4', borderColor: '#00BCD4' }]}>
                                    {freezeChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>There is ice accumulating on my AC coils.</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Freeze Warning Inject */}
                        {freezeChecked && (
                            <View style={[styles.hazardBanner, { backgroundColor: '#E0F7FA', borderColor: '#00BCD4', borderWidth: 1 }]}>
                                <Icon name="AlertCircle" size={24} color="#00BCD4" />
                                <View style={styles.hazardTextCol}>
                                    <Text style={[styles.hazardTitle, { color: '#006064' }]}>FREEZE-UP PROTOCOL</Text>
                                    <Text style={[styles.hazardDesc, { color: '#00838F' }]}>Turn OFF the A/C immediately. Run the FAN ONLY to thaw the unit. You cannot diagnose low refrigerant or bad airflow while frozen.</Text>
                                </View>
                            </View>
                        )}

                        {/* Critical System Check */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: hvacTheme }]}>CRITICAL SYSTEM CHECK</Text>

                            <View style={styles.checkRow}>
                                <TouchableOpacity
                                    style={[styles.slideToggle, killSwitchSlid && styles.slideToggleActive]}
                                    onPress={() => setKillSwitchSlid(!killSwitchSlid)}
                                >
                                    <View style={[styles.slideKnob, killSwitchSlid && styles.slideKnobActive]}>
                                        <Icon name={killSwitchSlid ? "Power" : "AlertCircle"} size={14} color={killSwitchSlid ? "#FFF" : "#121212"} />
                                    </View>
                                    <Text style={[styles.slideText, killSwitchSlid && { color: '#FFF' }]}>
                                        {killSwitchSlid ? "SYSTEM ISOLATED" : "SLIDE TO CONFIRM POWER OFF"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.checkDesc, { marginBottom: 20 }]}>THE DOUBLE-KILL: Have you switched off the thermostat AND flipped the dedicated HVAC breaker/service switch?</Text>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setCarbonChecked(!carbonChecked)}>
                                <View style={[styles.checkbox, carbonChecked && styles.checkboxActive]}>
                                    {carbonChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE CARBON CHECK</Text>
                                    <Text style={styles.checkDesc}>Is your Carbon Monoxide (CO) detector active and tested?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Tiered Logic Outline */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: hvacTheme }]}>SKILL LEVEL CLEARANCE</Text>

                            <View style={styles.tierRow}>
                                <View style={styles.tierBadge}><Text style={styles.tierText}>L1</Text></View>
                                <Text style={styles.tierDesc}>Maintenance: Filters, drain lines, washing coils.</Text>
                            </View>
                            <View style={styles.tierRow}>
                                <View style={styles.tierBadge}><Text style={styles.tierText}>L2</Text></View>
                                <Text style={styles.tierDesc}>Component Swapper: Testing capacitors & contactors.</Text>
                            </View>
                            <View style={styles.tierRow}>
                                <View style={[styles.tierBadge, { backgroundColor: '#F44336' }]}><Text style={styles.tierText}>L3</Text></View>
                                <Text style={styles.tierDesc}>System Tech: Control boards & inducer motors.</Text>
                            </View>
                            <View style={{ backgroundColor: 'rgba(244,67,54,0.1)', padding: 12, borderRadius: 4, marginTop: 8 }}>
                                <Text style={{ ...typography.body, fontSize: 10, color: '#F44336', fontFamily: 'Roboto Mono', fontWeight: 'bold' }}>STOP: EPA Section 608 Certification is REQUIRED by federal law for connecting gauges or handling refrigerant.</Text>
                            </View>
                        </View>

                        {/* Toolbox Audit */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: hvacTheme }]}>THE HVAC LOADOUT</Text>
                            <Text style={styles.auditItem}>• The Essentials: Milwaukee Fastback & 11-in-1</Text>
                            <Text style={styles.auditItem}>• The Diagnosticians: Fieldpiece Multimeter & NCVT</Text>
                            <Text style={styles.auditItem}>• The Cleaners: Nu-Calgon Coil Cleaner & Shop-Vac</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.startProjectBtn, { backgroundColor: hvacTheme }, (!killSwitchSlid || !carbonChecked) && styles.startProjectBtnDisabled]}
                            onPress={() => setSafetyChecked(true)}
                            disabled={!killSwitchSlid || !carbonChecked}
                        >
                            <Text style={styles.startProjectBtnText}>
                                {(!killSwitchSlid || !carbonChecked) ? 'COMPLETE CHECKS TO START' : 'SYSTEMS SECURED - START PROJECT'}
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            );
        }

        if (isStructural) {
            if (foundationChecked) {
                return (
                    <View style={[styles.safetyContainer, { backgroundColor: '#F44336' }]}>
                        <View style={styles.warningHeader}>
                            <Icon name="Activity" size={64} color="#121212" />
                            <Text style={styles.warningTitle}>FOUNDATION ALERT</Text>
                            <Text style={styles.warningSub}>ACTIVE SOIL MOVEMENT DETECTED</Text>
                        </View>
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>1. HORIZONTAL CRACKS INDICATE SHEAR STRESS.</Text>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>2. STAIR-STEP MASONRY CRACKS INDICATE SETTLING.</Text>
                            <Text style={[styles.checkText, { color: '#FFF' }]}>3. STOP WORK. DIY STABILIZATION IS DANGEROUS.</Text>
                        </View>
                        <TouchableOpacity style={[styles.proBtn, { backgroundColor: '#121212' }]} onPress={() => navigation.navigate('ProConnect')}>
                            <Icon name="Briefcase" size={24} color="#F44336" />
                            <Text style={[styles.proBtnText, { color: '#F44336', fontSize: 18 }]}>CALL STRUCTURAL ENGINEER</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

            return (
                <View style={[styles.safetyContainer, { backgroundColor: '#121212' }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.plumbingHeader, { borderBottomColor: '#FF9800', backgroundColor: '#37474F' }]}>
                            <Icon name="HardDrive" size={48} color="#FF9800" />
                            <Text style={[styles.plumbingTitle, { color: '#FF9800' }]}>STRUCTURAL PROTOCOL</Text>
                            <Text style={[styles.warningSub, { color: '#E0E0E0' }]}>Context: {context.toUpperCase()}</Text>
                        </View>

                        {/* Structural Header Image */}
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1541888081622-4a00bccf28b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
                            style={{ height: 160, width: '100%', marginBottom: 16, borderRadius: 8 }}
                        />

                        {/* High-Stakes Troubleshooting */}
                        <View style={[styles.checklistCard, { borderColor: '#F44336', borderWidth: 2 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Icon name="AlertTriangle" size={20} color="#F44336" />
                                <Text style={[styles.checklistTitle, { color: '#F44336', marginBottom: 0, marginLeft: 8 }]}>STRUCTURAL FAIL-STATES</Text>
                            </View>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setFoundationChecked(true)}>
                                <View style={[styles.checkbox, foundationChecked && { backgroundColor: '#F44336', borderColor: '#F44336' }]} />
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>I see horizontal cracks in the foundation or stair-step cracks in brickwork.</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setShoringChecked(!shoringChecked)}>
                                <View style={[styles.checkbox, shoringChecked && { backgroundColor: '#FF9800', borderColor: '#FF9800' }]}>
                                    {shoringChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <Text style={[styles.checkTitle, { marginTop: 2 }]}>The project involves removing more than two adjacent wall studs.</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Shoring Rule Warning */}
                        {shoringChecked && (
                            <View style={[styles.hazardBanner, { backgroundColor: '#FFF3E0', borderColor: '#FF9800', borderWidth: 1 }]}>
                                <Icon name="AlertCircle" size={24} color="#FF9800" />
                                <View style={styles.hazardTextCol}>
                                    <Text style={[styles.hazardTitle, { color: '#E65100' }]}>THE SHORING RULE</Text>
                                    <Text style={[styles.hazardDesc, { color: '#E65100' }]}>TEMPORARY SUPPORT REQUIRED. If replacing an LVL or removing multiple king studs, a shoring wall must be built 2ft back from the cut line before demolition.</Text>
                                </View>
                            </View>
                        )}

                        {/* Critical System Check */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: '#FF9800' }]}>GRAVITY & INTEGRITY AUDIT</Text>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setLoadBearingChecked(!loadBearingChecked)}>
                                <View style={[styles.checkbox, loadBearingChecked && styles.checkboxActiveStructural]}>
                                    {loadBearingChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE LOAD-BEARING AUDIT</Text>
                                    <Text style={styles.checkDesc}>Is this wall holding up a floor or roof above it? If unsure, treat it as load-bearing.</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setUtilityScanChecked(!utilityScanChecked)}>
                                <View style={[styles.checkbox, utilityScanChecked && styles.checkboxActiveStructural]}>
                                    {utilityScanChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>THE UTILITY SCAN</Text>
                                    <Text style={styles.checkDesc}>Have you scanned the bays for hidden plumbing stacks or Romex conduit?</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.checkRow} onPress={() => setPpeChecked(!ppeChecked)}>
                                <View style={[styles.checkbox, ppeChecked && styles.checkboxActiveStructural]}>
                                    {ppeChecked && <Icon name="Check" size={16} color="#121212" />}
                                </View>
                                <View style={styles.checkTextCol}>
                                    <Text style={styles.checkTitle}>HEAVY PPE REQUIREMENT</Text>
                                    <Text style={styles.checkDesc}>Are you wearing impact-resistant eye protection and an N95 dust mask?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Tiered Logic Outline */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: '#FF9800' }]}>SKILL LEVEL CLEARANCE</Text>

                            <View style={styles.tierRow}>
                                <View style={styles.tierBadge}><Text style={styles.tierText}>L1</Text></View>
                                <Text style={styles.tierDesc}>General Repair: Drywall patch, door hanging.</Text>
                            </View>
                            <View style={styles.tierRow}>
                                <View style={styles.tierBadge}><Text style={styles.tierText}>L2</Text></View>
                                <Text style={styles.tierDesc}>Framing/Masonry: Non-load partitions, deck joists.</Text>
                            </View>
                            <View style={styles.tierRow}>
                                <View style={[styles.tierBadge, { backgroundColor: '#F44336' }]}><Text style={styles.tierText}>L3</Text></View>
                                <Text style={styles.tierDesc}>Major Structure: Headers, structural posts, footings.</Text>
                            </View>
                            <View style={{ backgroundColor: 'rgba(244,67,54,0.1)', padding: 12, borderRadius: 4, marginTop: 8 }}>
                                <Text style={{ ...typography.body, fontSize: 10, color: '#F44336', fontFamily: 'Roboto Mono', fontWeight: 'bold' }}>WARNING: Consult a Structural Engieer for Level 3 tasks to avoid catastrophic failure.</Text>
                            </View>
                        </View>

                        {/* Toolbox Audit */}
                        <View style={styles.checklistCard}>
                            <Text style={[styles.checklistTitle, { color: '#FF9800' }]}>THE STRUCTURAL LOADOUT</Text>
                            <Text style={styles.auditItem}>• The Essentials: Estwing 20oz & FatMax 25ft Tape</Text>
                            <Text style={styles.auditItem}>• The Levelers: Stabila 48-inch Spirit Level</Text>
                            <Text style={styles.auditItem}>• The Power: M18 Circular Saw & 10lb Sledge</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.startProjectBtn, { backgroundColor: '#FF9800' }, (!loadBearingChecked || !utilityScanChecked || !ppeChecked) && styles.startProjectBtnDisabled]}
                            onLongPress={() => {
                                if (loadBearingChecked && utilityScanChecked && ppeChecked) {
                                    setSafetyChecked(true);
                                }
                            }}
                            delayLongPress={1500}
                            disabled={!loadBearingChecked || !utilityScanChecked || !ppeChecked}
                        >
                            <Text style={styles.startProjectBtnText}>
                                {(!loadBearingChecked || !utilityScanChecked || !ppeChecked) ? 'COMPLETE CHECKS TO START' : 'PRESSURE: HOLD TO BREAK GROUND'}
                            </Text>
                            {(loadBearingChecked && utilityScanChecked && ppeChecked) && (
                                <View style={{ position: 'absolute', bottom: 0, left: 0, height: 4, backgroundColor: '#121212', width: '100%', opacity: 0.5 }} />
                            )}
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            );
        }

        // Standard Generic Safety
        return (
            <View style={styles.safetyContainer}>
                <View style={styles.warningHeader}>
                    <Icon name="AlertTriangle" size={48} color="#121212" />
                    <Text style={styles.warningTitle}>CRITICAL SAFETY CHECK</Text>
                    <Text style={styles.warningSub}>Context: {context}</Text>
                </View>

                <View style={styles.checklist}>
                    <Text style={styles.checkText}>1. Is the MAIN BREAKER turned OFF?</Text>
                    <Text style={styles.checkText}>2. Is the MAIN WATER VALVE turned OFF?</Text>
                    <Text style={styles.checkText}>3. Do you have proper safety gear?</Text>
                </View>

                <TouchableOpacity style={styles.proBtn} onPress={() => navigation.navigate('ProConnect')}>
                    <Icon name="PhoneCall" size={20} color="#FFF" />
                    <Text style={styles.proBtnText}>THIS IS DANGEROUS - CALL A PRO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confirmBtn} onPress={() => setSafetyChecked(true)}>
                    <Text style={styles.confirmBtnText}>SYSTEMS SECURED - PROCEED</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>VIRTUAL TRADESMAN: {context.toUpperCase()}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Visual Diagnosis Section */}
                <View style={styles.diagSection}>
                    <Text style={styles.sectionTitle}>VISUAL DIAGNOSIS</Text>

                    <View style={styles.scannerBox}>
                        {isScanning ? (
                            <View style={styles.scanningWrap}>
                                <Icon name="Camera" size={40} color={colors.workshopAccent} />
                                <Text style={styles.scanningText}>ANALYZING PART...</Text>
                            </View>
                        ) : (
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1504382212959-1e3a73c09bca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                                style={styles.scannedImage}
                            />
                        )}
                        <View style={styles.scannerOverlay}>
                            <View style={styles.bracketTL} />
                            <View style={styles.bracketTR} />
                            <View style={styles.bracketBL} />
                            <View style={styles.bracketBR} />
                        </View>
                    </View>

                    {partIdentified && (
                        <View style={styles.partMatchCard}>
                            <View style={styles.matchIconWrap}>
                                <Icon name="CheckCircle" size={24} color="#4CAF50" />
                            </View>
                            <View style={styles.matchTextWrap}>
                                <Text style={styles.matchTitle}>MATCH FOUND: 3/4" Brass Ball Valve</Text>
                                <Text style={styles.matchSpec}>SKU: BV-750-BR // IN STOCK</Text>
                            </View>
                            <TouchableOpacity style={styles.buyBtn}>
                                <Text style={styles.buyBtnText}>BUY</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Step-by-Step Garage Mode */}
                <View style={styles.guideSection}>
                    <Text style={styles.sectionTitle}>GARAGE MODE: REPAIR GUIDE</Text>
                    <View style={styles.stepCard}>
                        <Text style={styles.stepNumber}>STEP {step} OF 4</Text>
                        <Text style={styles.stepInst}>
                            {step === 1 ? "Using a pipe wrench, turn the old valve counter-clockwise to loosen. Apply firm pressure." :
                                step === 2 ? "Clean the pipe threads thoroughly with a wire brush." :
                                    "Apply Teflon tape clockwise around the threads."}
                        </Text>
                    </View>
                </View>

            </ScrollView>

            {/* Garage Mode Giant Next Button */}
            <TouchableOpacity
                style={styles.garageNextBtn}
                onPress={() => setStep(s => s < 4 ? s + 1 : s)}
            >
                <Text style={styles.garageNextText}>NEXT STEP</Text>
                <Icon name="ArrowRight" size={32} color="#121212" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safetyContainer: {
        flex: 1,
        backgroundColor: colors.workshopAccent, // Flashing Yellow Warning
        padding: 24,
        justifyContent: 'center',
    },
    warningHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    warningTitle: {
        ...typography.header,
        color: '#121212',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 32,
    },
    warningSub: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#121212',
        marginTop: 8,
        fontWeight: 'bold',
    },
    checklist: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 24,
        borderRadius: 8,
        marginBottom: 40,
    },
    checkText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
    },
    proBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAction, // Safety Orange
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
    },
    proBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 12,
        fontSize: 16,
    },
    confirmBtn: {
        backgroundColor: '#121212',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.workshopAccent,
        fontSize: 16,
    },
    plumbingHeader: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 2,
        borderBottomColor: '#03A9F4',
        marginBottom: 20,
    },
    plumbingTitle: {
        ...typography.header,
        color: '#03A9F4', // Water Blue
        textAlign: 'center',
        marginTop: 16,
        fontSize: 28,
        letterSpacing: 2,
    },
    hazardBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.workshopAccent, // Warning Yellow
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    hazardTextCol: {
        flex: 1,
        marginLeft: 16,
    },
    hazardTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        fontSize: 14,
        letterSpacing: 1,
    },
    hazardDesc: {
        ...typography.body,
        color: '#121212',
        fontSize: 12,
        marginTop: 4,
    },
    checklistCard: {
        backgroundColor: '#1E1E1E',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    checklistTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
        marginBottom: 16,
        letterSpacing: 2,
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors.workshopAccent,
        borderRadius: 4,
        marginRight: 16,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: colors.workshopAccent,
    },
    checkboxActiveStructural: {
        backgroundColor: '#FF9800', // Construction Orange
        borderColor: '#FF9800',
    },
    checkTextCol: {
        flex: 1,
    },
    checkTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 14,
        marginBottom: 4,
    },
    checkDesc: {
        ...typography.body,
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
    },
    auditItem: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontSize: 14,
        marginBottom: 12,
    },
    startProjectBtn: {
        backgroundColor: '#03A9F4', // Water Blue
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 40,
    },
    startProjectBtnDisabled: {
        backgroundColor: '#333',
    },
    startProjectBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        fontSize: 14,
    },
    slideToggle: {
        height: 48,
        backgroundColor: '#333',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        flex: 1,
    },
    slideToggleActive: {
        backgroundColor: '#4CAF50',
    },
    slideKnob: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.workshopAccent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slideKnobActive: {
        backgroundColor: '#121212',
        transform: [{ translateX: 280 }], // Mock slide distance
    },
    slideText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#666',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        zIndex: -1,
    },
    tierRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tierBadge: {
        backgroundColor: '#333',
        width: 32,
        height: 32,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    tierText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 12,
    },
    tierDesc: {
        ...typography.body,
        color: '#CCC',
        fontSize: 12,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120, // Space for giant next button
    },
    sectionTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
        marginBottom: 16,
        letterSpacing: 1,
    },
    diagSection: {
        marginBottom: 32,
    },
    scannerBox: {
        height: 200,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 16,
    },
    scanningWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanningText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.workshopAccent,
        marginTop: 12,
    },
    scannedImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    scannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    bracketTL: { position: 'absolute', top: 16, left: 16, width: 20, height: 20, borderTopWidth: 4, borderLeftWidth: 4, borderColor: colors.workshopAccent },
    bracketTR: { position: 'absolute', top: 16, right: 16, width: 20, height: 20, borderTopWidth: 4, borderRightWidth: 4, borderColor: colors.workshopAccent },
    bracketBL: { position: 'absolute', bottom: 16, left: 16, width: 20, height: 20, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: colors.workshopAccent },
    bracketBR: { position: 'absolute', bottom: 16, right: 16, width: 20, height: 20, borderBottomWidth: 4, borderRightWidth: 4, borderColor: colors.workshopAccent },
    partMatchCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    matchIconWrap: {
        marginRight: 12,
    },
    matchTextWrap: {
        flex: 1,
    },
    matchTitle: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 14,
    },
    matchSpec: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
        fontSize: 10,
        marginTop: 4,
    },
    buyBtn: {
        backgroundColor: colors.workshopAction,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buyBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
    },
    guideSection: {
        marginBottom: 20,
    },
    stepCard: {
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    stepNumber: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.workshopAccent,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    stepInst: {
        ...typography.body,
        color: '#FFF',
        fontSize: 20,
        lineHeight: 28,
    },
    garageNextBtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.workshopAccent, // Industrial Yellow
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 40, // Account for safe area
    },
    garageNextText: {
        ...typography.header,
        color: '#121212',
        fontSize: 32,
    }
});
