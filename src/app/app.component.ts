import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Network, Edge, Options, Node as NetworkNode, Data as NetworkData} from 'vis-network';
import { DdgtopicsService } from './shared/ddgtopics.service';
import { DDGTopicsResponse, Topic as DDGTopic } from './shared/model/ddg-topics-response';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ddgtopicsexplorer';

  showImage = false;

  profileForm: FormGroup;
  currentSearch: string;
  latestData: NetworkData;
  searchingStatus: string;
  drawingStatus: string;
  latestDDGTopicsResponse: DDGTopicsResponse;
  network: Network;

  constructor(private ddgtopicsService: DdgtopicsService){
  }

  ngOnInit() {
    const firstInput = new FormControl('developer');
    this.profileForm = new FormGroup({
      firstInput
    });
    this.network = new Network(document.getElementById('ddgTopicNetwork'),
                              this.generateEmptyData(),
                              this.generateBaseOptions());

    this.network.on('initRedraw', () => {
      this.drawingStatus = 'Performing Redraw of Graph';
      console.log('initRedraw');
    });
    this.network.on('beforeDrawing', () => {
      this.drawingStatus = 'Drawing Network Graph';
      console.log('beforeDrawing');
    });
    this.network.on('afterDrawing', () => {
      this.drawingStatus = '';
      console.log('afterDrawing');
    });
  }

  saveSearch() {
    this.searchingStatus = 'searching';
    this.currentSearch = this.profileForm.controls.firstInput.value;
    const serviceResult = this.ddgtopicsService.getTopicSummary(this.currentSearch);
    serviceResult.subscribe(res => {
      if (res){
        this.network.setData(this.generateNodesAndEdgesForData(res));
        // this.network.deleteSelected();
      } else {
        console.error('result is empty');
        this.searchingStatus = 'Service error';
      }
    });
  }

  togglePhysics(){
    this.network.setOptions({
      physics: { enabled: !(this.network['physics'].options.enabled)}
    });
  }
  toggleDragMode(){
    this.network.setOptions({
      interaction: {
        dragNodes: !(this.network['interactionHandler'].options.dragNodes),
        dragView: !(this.network['interactionHandler'].options.dragView)
      }
    });
  }
  toggleImages(){
    this.showImage = !this.showImage;
  }

  generateNodesAndEdgesForData(response: DDGTopicsResponse ) {

    const newNodes: NetworkNode[] = [];
    const newEdges: Edge[] = [];

    const baseNodeIndex = 1;
    let nodeIndex = baseNodeIndex.valueOf();

    if (response instanceof Array && response.length === 0){
      console.error('No or incorrect response found:');
      console.error(response);

      this.searchingStatus = 'Result error';
      return;
    }


    const MainEntry: DDGTopic = {
      Result: undefined,
      Icon: undefined ,
      Text: response.Heading,
      FirstURL: response.AbstractURL
    };

    newNodes.push(this.generateBasicNodeObjectFromEntry(nodeIndex, MainEntry));
    newEdges.push(this.getEdge(baseNodeIndex, nodeIndex));
    nodeIndex++;
    if (response.RelatedTopics){
      response.RelatedTopics?.forEach( entry => {
        newNodes.push(this.generateBasicNodeObjectFromEntry(nodeIndex, entry));
        newEdges.push(this.getEdge(baseNodeIndex, nodeIndex));

        if (entry.Topics) {

          const subTopicBaseIndex = nodeIndex;
          nodeIndex++;

          entry.Topics.forEach( (topic: DDGTopic) => {
            newNodes.push(this.generateBasicNodeObjectFromEntry(nodeIndex, topic));
            newEdges.push(this.getEdge(subTopicBaseIndex, nodeIndex));
            nodeIndex++;
          });
        } else {
          nodeIndex++;

        }
      });
    } else {
      console.log('no related topics found.');
    }

    const newData: NetworkData = {  nodes: newNodes, edges: newEdges };

    this.searchingStatus = 'Result loaded';
    return newData;
  }


  generateBasicNodeObjectFromEntry(nodeIndex: number, entry: DDGTopic) {
    const node: NetworkNode = {
      id: nodeIndex,
      // color: 'red',
      // size: 20,
      font: {
        size: 20
      }
    };
    node.widthConstraint = { maximum: 200 };

    node.label = entry.Text ? entry.Text : entry.Name;
    if (this.showImage){

      if (entry.Icon?.URL){
        node.shape = 'image';
        node.image = entry.Icon?.URL;
      }
    }
    return node;
  }

  generateEmptyData(){
    const data = {
      nodes: [ {id: 1, label: 'Search for a Topic'}],
      edges: []
    };
    return data;
  }
  getEdge(baseIndex: number, nodeIndex: number): Edge {
    let edge: Edge;

    if (nodeIndex === baseIndex){
      edge = { };
    } else {
      edge = {
        from: baseIndex,
        to: nodeIndex,
      };
    }
    return edge;
  }

  generateBaseOptions(){
    const windowheight: number = window.innerHeight;
    const newWindowHeight: number = windowheight * 0.9;
    const options: Options = {
      height: newWindowHeight.toString(),
      interaction: {
        dragNodes: true,
        dragView: true,
      },
      physics: {
        enabled: true,
        solver: 'barnesHut',
        barnesHut: {
          avoidOverlap: 0.6
        }
      },
      nodes: {
        font: {
          size: 16,
        },
      }

    };
    return options;
  }

}
