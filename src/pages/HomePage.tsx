import React, { useState } from 'react';
import styled from 'styled-components';
import CustomSlider from '../components/CustomSlider';

const HomeContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 90px);
  padding: 140px;
`;

const CentralButton = styled.div.attrs({ className: 'central-button' })<any>`
  width: ${(props) => (props.expanded ? '80vw' : '500px')};
  height: ${(props) => (props.expanded ? 'auto' : '300px')};
  border: 5px solid #49CA38;
  border-radius: 2px;
  position: relative;
  cursor: ${(props) => (props.expanded ? 'default' : 'pointer')};
  overflow: visible;
  transition: all 0.3s ease;

  &:hover:not(.expanded) {
    transform: scale(1.02);
  }
`;

const ButtonText = styled.span`
  position: absolute;
  bottom: 5px;
  right: 25px;
  color: #49CA38;
  font-size: 28px;
  text-align: center;
  font-style: italic;
  font-family: 'Kanit', sans-serif;
`;

const SideText = styled.div`
  position: absolute;
  right: -70px;
  top: 30%;
  transform: translateY(-50%) rotate(-90deg);
  color: #49CA38;
  font-size: 16px;
  font-style: italic;
  display: flex;
  align-items: center;
  font-family: 'Kanit', sans-serif;
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: -65px;
  left: 5px;
  font-size: 45px;
  font-weight: 900;
  color: #49CA38;
  font-family: 'Kanit', sans-serif;
  pointer-events: none;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  color: #49CA38;
  margin-bottom: 30px;
  font-size: 28px;
  font-family: 'Kanit', sans-serif;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: flex;
  font-size: 20px;
  font-family: 'Kanit', sans-serif;
  color: #49CA38;
  flex-direction: column;
  align-items: center;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: 'Kanit', sans-serif;
  color: #49CA38;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Kanit', sans-serif;
  width: 100%;
  max-width: 700px;

  &:focus {
    outline: none;
    border-color: #49CA38;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Kanit', sans-serif;
  width: 100%;
  max-width: 700px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #49CA38;
  }
`;

const SubmitButton = styled.button`
  background-color: #49CA38;
  color: white;
  border: 2px solid #49CA38;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  align-self: center;
  font-family: 'Kanit', sans-serif;
  border-radius: 3px;

  &:hover {
    background-color: #3ab42f;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
`;

const SummaryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #f8f8f8;
  padding: 30px;
  border-radius: 6px;
`;

const SummaryItem = styled.div`
  margin-bottom: 16px;
  font-size: 18px;
  font-family: 'Kanit', sans-serif;
  color: #333;
  line-height: 1.4;

  & > span {
    font-weight: 600;
    color: #49ca38;
  }
`;

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);

  const [description, setDescription] = useState('');
  const improvementOptions = ['photos', 'description', 'seo'];
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [seasons, setSeasons] = useState('');
  const [audience, setAudience] = useState('');
  const [customers, setCustomers] = useState('');
  const [occupancyDays, setOccupancyDays] = useState(180);

  const [adPhotos, setAdPhotos] = useState<FileList | null>(null);
  const [adDescription, setAdDescription] = useState('');
  const [airbnbLink, setAirbnbLink] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    setShowForm(true);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleImprovementChange = (option: string) => {
    setSelectedImprovements((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleFinalSubmit = () => {
    alert('Данные успешно отправлены!');
  };

  return (
    <HomeContainer>
      <CentralButton
        onClick={!showForm ? handleClick : undefined}
        expanded={showForm}
      >
        {!showForm && (
          <>
            <ButtonText>ready to get puusted?</ButtonText>
            <SideText>↑ click here</SideText>
            <LogoContainer>puusti</LogoContainer>
          </>
        )}

        {showForm && (
          <FormContainer>
            <FormTitle>submit your info</FormTitle>

            {step < 4 ? (
              <StyledForm onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <FormGroup>
                      <Label htmlFor="description">
                        tell us abt your property
                      </Label>
                      <Input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>what do you want to improve?</Label>
                      <CheckboxGroup>
                        {improvementOptions.map((option) => (
                          <CheckboxLabel key={option}>
                            <input
                              type="checkbox"
                              value={option}
                              checked={selectedImprovements.includes(option)}
                              onChange={() => handleImprovementChange(option)}
                            />
                            &nbsp;{option}
                          </CheckboxLabel>
                        ))}
                      </CheckboxGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="seasons">
                        which seasons are the most important?
                      </Label>
                      <Input
                        type="text"
                        id="seasons"
                        value={seasons}
                        onChange={(e) => setSeasons(e.target.value)}
                        placeholder="e.g. summer, Christmas holidays"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="audience">
                        who is your target audience?
                      </Label>
                      <Input
                        type="text"
                        id="audience"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g. couples, families, remote workers"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="customers">
                        are your customers fins or others?
                      </Label>
                      <Input
                        type="text"
                        id="customers"
                        value={customers}
                        onChange={(e) => setCustomers(e.target.value)}
                        placeholder="e.g. 70% foreigners, 30% locals"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="occupancy">
                        occupation days per year?
                      </Label>
                      <CustomSlider
                        min={0}
                        max={365}
                        value={occupancyDays}
                        onChange={setOccupancyDays}
                      />
                    </FormGroup>
                  </>
                )}

                {/* ==================== SECTION 2 ==================== */}
                {step === 2 && (
                  <>
                    {selectedImprovements.includes('photos') && (
                      <FormGroup>
                        <Label htmlFor="adPhotos">
                          add photos from your listing
                        </Label>
                        <Input
                          type="file"
                          id="adPhotos"
                          multiple
                          accept="image/*"
                          onChange={(e) => setAdPhotos(e.target.files)}
                        />
                      </FormGroup>
                    )}

                    {selectedImprovements.includes('description') && (
                      <FormGroup>
                        <Label htmlFor="adDescription">
                          problematic ad description (copy from Airbnb)
                        </Label>
                        <Textarea
                          id="adDescription"
                          rows={4}
                          value={adDescription}
                          onChange={(e) => setAdDescription(e.target.value)}
                          placeholder="Paste your Airbnb ad description here..."
                          required
                        />
                      </FormGroup>
                    )}

                    {/* Airbnb Link — всегда */}
                    <FormGroup>
                      <Label htmlFor="airbnbLink">
                        Airbnb listing link
                      </Label>
                      <Input
                        type="url"
                        id="airbnbLink"
                        value={airbnbLink}
                        onChange={(e) => setAirbnbLink(e.target.value)}
                        placeholder="https://www.airbnb.com/rooms/..."
                        required
                      />
                    </FormGroup>
                  </>
                )}

                {/* ==================== SECTION 3 ==================== */}
                {step === 3 && (
                  <>
                    <FormGroup>
                      <Label htmlFor="fullName">your full name, pleaseee</Label>
                      <Input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="email">
                        email where we will contact you back
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormGroup>
                  </>
                )}

                <ButtonRow>
                  {step > 1 && (
                    <SubmitButton type="button" onClick={handleBack}>
                      Back
                    </SubmitButton>
                  )}

                  {step < 3 && (
                    <SubmitButton type="button" onClick={handleNext}>
                      Next
                    </SubmitButton>
                  )}

                  {step === 3 && <SubmitButton type="submit">Submit</SubmitButton>}
                </ButtonRow>
              </StyledForm>
            ) : (
              <SummaryContainer>
                <FormTitle>Review Your Information</FormTitle>

                <SummaryItem>
                  <span>Property Description:</span> {description}
                </SummaryItem>
                <SummaryItem>
                  <span>Improvements:</span>{' '}
                  {selectedImprovements.length > 0
                    ? selectedImprovements.join(', ')
                    : '—'}
                </SummaryItem>
                <SummaryItem>
                  <span>Seasons:</span> {seasons}
                </SummaryItem>
                <SummaryItem>
                  <span>Target Audience:</span> {audience}
                </SummaryItem>
                <SummaryItem>
                  <span>Customers (fins or others):</span> {customers}
                </SummaryItem>
                <SummaryItem>
                  <span>Occupation Days per Year:</span> {occupancyDays}
                </SummaryItem>

                {selectedImprovements.includes('photos') && (
                  <SummaryItem>
                    <span>Photos Uploaded:</span>{' '}
                    {adPhotos ? adPhotos.length + ' file(s)' : '0'}
                  </SummaryItem>
                )}
                {selectedImprovements.includes('description') && (
                  <SummaryItem>
                    <span>Description:</span> {adDescription}
                  </SummaryItem>
                )}
                <SummaryItem>
                  <span>Airbnb Link:</span> {airbnbLink}
                </SummaryItem>

                {/* Section 3 Summary */}
                <SummaryItem>
                  <span>Full Name:</span> {fullName}
                </SummaryItem>
                <SummaryItem>
                  <span>Email:</span> {email}
                </SummaryItem>

                <ButtonRow>
                  <SubmitButton type="button" onClick={handleBack}>
                    Back
                  </SubmitButton>
                  <SubmitButton type="button" onClick={handleFinalSubmit}>
                    Confirm &amp; Send
                  </SubmitButton>
                </ButtonRow>
              </SummaryContainer>
            )}
          </FormContainer>
        )}
      </CentralButton>
    </HomeContainer>
  );
};

export default HomePage;
