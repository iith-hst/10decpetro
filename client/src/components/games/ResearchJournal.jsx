import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const JournalArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const JournalEditor = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToolCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #666;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4ECDC4;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4ECDC4;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed #eee;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4ECDC4;
    background: #f9f9f9;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'primary'
        ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4)'
        : '#eee'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const PreviewCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
  }
`;

const Tag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

function ResearchJournal() {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({
        title: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        findings: '',
        images: [],
        tags: []
    });
    const [showPreview, setShowPreview] = useState(false);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const readers = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then(images => {
            setCurrentEntry({
                ...currentEntry,
                images: [...currentEntry.images, ...images]
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            ...currentEntry,
            id: Date.now(),
            publishedDate: new Date().toISOString()
        };
        setEntries([newEntry, ...entries]);
        setCurrentEntry({
            title: '',
            location: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
            findings: '',
            images: [],
            tags: []
        });
    };

    const addTag = (tag) => {
        if (!currentEntry.tags.includes(tag)) {
            setCurrentEntry({
                ...currentEntry,
                tags: [...currentEntry.tags, tag]
            });
        }
    };

    return (
        <GameContainer>
            <h2>Research Journal</h2>
            <p>Document and share your petroglyph discoveries</p>

            <JournalArea>
                <JournalEditor>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label>Title</label>
                            <Input
                                type="text"
                                value={currentEntry.title}
                                onChange={(e) => setCurrentEntry({
                                    ...currentEntry,
                                    title: e.target.value
                                })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Location</label>
                            <Input
                                type="text"
                                value={currentEntry.location}
                                onChange={(e) => setCurrentEntry({
                                    ...currentEntry,
                                    location: e.target.value
                                })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Date of Discovery</label>
                            <Input
                                type="date"
                                value={currentEntry.date}
                                onChange={(e) => setCurrentEntry({
                                    ...currentEntry,
                                    date: e.target.value
                                })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Description</label>
                            <TextArea
                                value={currentEntry.description}
                                onChange={(e) => setCurrentEntry({
                                    ...currentEntry,
                                    description: e.target.value
                                })}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Images</label>
                            <ImageUpload onClick={() => document.getElementById('image-upload').click()}>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <p>Click to upload images</p>
                                {currentEntry.images.length > 0 && (
                                    <p>{currentEntry.images.length} images selected</p>
                                )}
                            </ImageUpload>
                        </FormGroup>

                        <Button
                            type="submit"
                            variant="primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Save Entry
                        </Button>
                    </form>
                </JournalEditor>

                <SidePanel>
                    <ToolCard>
                        <h3>Quick Tags</h3>
                        <div>
                            {['Hunting Scene', 'Animal', 'Human Figure', 'Geometric', 'Ritual'].map(tag => (
                                <Tag
                                    key={tag}
                                    onClick={() => addTag(tag)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    </ToolCard>

                    <Button
                        onClick={() => setShowPreview(!showPreview)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {showPreview ? 'Hide' : 'Show'} Journal Entries
                    </Button>
                </SidePanel>
            </JournalArea>

            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {entries.map(entry => (
                            <PreviewCard key={entry.id}>
                                {entry.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Discovery ${index + 1}`} />
                                ))}
                                <h3>{entry.title}</h3>
                                <p><strong>Location:</strong> {entry.location}</p>
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p>{entry.description}</p>
                                <div>
                                    {entry.tags.map(tag => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))}
                                </div>
                            </PreviewCard>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </GameContainer>
    );
}

export default ResearchJournal; 