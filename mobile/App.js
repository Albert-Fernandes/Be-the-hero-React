import React from 'react';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
  /** Reactive Native não tem tag semanticas para construção da estrutura a estilização dos elementos se da
   * atraves de um objeto js em que a escrita das estilizações tambem se da atraves da escrita js
   * disflex ja vem como padrao para todos os elementos e na estilização nao existe herança, 
   * 
   */
export default function App() {
  return (
    <Routes/>
  );
}
