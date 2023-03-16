// import React, { Component } from 'react';

// interface IFormPageProps {
//   onChangeNamePage: (namePage: string) => void;
// }

// class FormPage extends Component<IFormPageProps> {
//   componentDidMount() {
//     this.props.onChangeNamePage('Form Page');
//   }

//   render() {
//     return (
//       <>
//         <h3>Form page</h3>
//       </>
//     );
//   }
// }

// export default FormPage;

import React, { Component } from 'react';
import FormCard from './FormCard';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  name: string;
  file: File | null;
  errors: {
    name: string;
    file: string;
  };
  cards: {
    name: string;
    imageUrl: string;
  }[];
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  private fileInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IFormPageProps) {
    super(props);

    this.state = {
      name: '',
      file: null,
      errors: {
        name: '',
        file: '',
      },
      cards: [],
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      name,
      errors: {
        ...prevState.errors,
        name: name ? '' : 'Name is required',
      },
    }));
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    this.setState((prevState) => ({
      ...prevState,
      file,
      errors: {
        ...prevState.errors,
        file: file ? '' : 'Image is required',
      },
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, file, errors } = this.state;

    if (!name || !file || errors.name || errors.file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrl = reader.result as string;
      this.setState((prevState) => ({
        name: '',
        file: null,
        errors: {
          name: '',
          file: '',
        },
        cards: [
          ...prevState.cards,
          {
            name,
            imageUrl,
          },
        ],
      }));
      this.fileInputRef.current!.value = ''; // clear file input
    };
  };

  render() {
    const { name, file, errors, cards } = this.state;
    const isSubmitDisabled = !name || !file || errors.name || errors.file;

    return (
      <>
        <h3>Form page</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={this.handleNameChange} />
            </label>
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
          </div>
          <div>
            <label>
              Image:
              <input type="file" ref={this.fileInputRef} onChange={this.handleFileChange} />
            </label>
            {errors.file && <div style={{ color: 'red' }}>{errors.file}</div>}
          </div>
          <button type="submit" disabled={!!isSubmitDisabled}>
            Submit
          </button>
        </form>
        {cards.length > 0 && (
          <>
            <p style={{ color: 'green' }}>Data has been saved!</p>
            <ul>
              {cards.map((card, index) => (
                <li key={index}>
                  <div>{card.name}</div>
                  <img src={card.imageUrl} alt={card.name} style={{ maxWidth: '100%' }} />
                </li>
              ))}
            </ul>
          </>
        )}
        <FormCard
          product={{
            id: Date.now(),
            title: 'TITLE',
            description: 'description',
            imageUrl: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          }}
        />
      </>
    );
  }
}

export default FormPage;
