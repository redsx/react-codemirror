import React, { PureComponent } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import Github from '@uiw/react-shields/lib/esm/github';
import Npm from '@uiw/react-shields/lib/esm/npm';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';

import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance-mobile.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/ssms.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/zenburn.css';

import MarkdownPreview from '@uiw/react-markdown-preview';
import modeInfo from './modes';
import DocumentStr from '../README.md';
import logo from './logo.png';
import styles from './App.module.less';
import CodeMirror from '../';

const themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder', 'idea', 'isotope', 'lesser-dark', 'liquibyte', 'lucario', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'oceanic-next', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'shadowfox', 'solarized', 'ssms', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'];

const Select = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps}> {item} </option>
        );
      })}
    </select>
  );
};


const SelectModes = ({ value, options, onChange }) => {
  const index = modeInfo.findIndex((item) => {
    if (item.ext) return item.ext.indexOf(value) > -1;
    else return item.mode === value;
  });
  return (
    <select value={index} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        optionProps.value = key;
        return (
          <option {...optionProps}> {item.name} </option>
        );
      })}
    </select>
  );
};
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      code: '',
      mode: 'jsx',
      theme: 'monokai',
      hyperlink: [
        {
          href: 'https://github.com/uiwjs/react-codemirror',
          label: 'View on GitHub',
        },
        {
          href: 'https://www.npmjs.com/package/@uiw/react-codemirror',
          label: 'View on NPM',
        },
        {
          href: 'http://codemirror.net/doc/manual.html#config',
          label: 'CM CONFIG',
        },
        {
          href: 'http://codemirror.net/demo/theme.html',
          label: 'CM THEME',
        },
        {
          href: 'http://codemirror.net/mode/',
          label: 'CM LANGUAGE MODE',
        },
      ],
    };
  }
  loadCode(lang) {
    import(`code-example/lib/${lang}.js`).then((data) => {
      this.setState({
        code: data.default,
      });
    }).catch(() => {
      this.setState({ code: 'Please enter a sample code.' });
    });
  }
  onChange(e) {
    const mode = modeInfo[e.target.value];
    if (mode.mode) {
      this.loadCode(mode.mode);
      this.setState({ mode: mode.mode });
    }
  }
  onChangeTheme(e) {
    this.setState({ theme: e.target.value });
  }
  getInstance = (instance) => {
    if (instance && instance.editor) {
      this.editor = instance.editor;
      instance.editor.focus();
      this.loadCode(this.state.mode);
    }
  }
  render() {
    const { mode, theme, hyperlink } = this.state;
    const version = VERSION; // eslint-disable-line
    return (
      <div className={styles.App}>
        <GitHubCorners fixed target="__blank" zIndex={10} href="https://github.com/uiwjs/react-codemirror" />
        <header className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h1 className={styles.AppTitle}>React-CodeMirror <sup>v{version}</sup></h1>
          <p className={styles.content}>CodeMirror component for React. </p>
          <div className={styles.button}>
            {hyperlink.map((item, idx) => {
              return (
                <a key={idx} target="_blank" rel="noopener noreferrer" href={item.href}>{item.label}</a>
              );
            })}
          </div>
          <div className={styles.select}>
            <SelectModes value={mode} options={modeInfo} onChange={this.onChange.bind(this)} />
            <Select value={theme} options={themes} onChange={this.onChangeTheme.bind(this)} />
          </div>
        </header>
        <CodeMirror
          value={this.state.code}
          ref={this.getInstance}
          options={{
            theme,
            keyMap: 'sublime',
            fullScreen: true,
            mode,
          }}
        />
        <MarkdownPreview className={styles.markdown} source={DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '')} />
        <div className={styles.footer}>
          <Github user="uiwjs" repo="react-codemirror">
            <Github.Social type="forks" href="https://github.com/uiwjs/react-codemirror" />
            <Github.Social type="stars" href="https://github.com/uiwjs/react-codemirror/stargazers" />
            <Github.Social type="watchers" href="https://github.com/uiwjs/react-codemirror/watchers" />
          </Github>
          <Npm.Version scope="@uiw" packageName="react-shields" href="https://www.npmjs.com/package/@uiw/react-codemirror" />
        </div>
      </div>
    );
  }
}
