import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Network, Edge, Options, Node as NetworkNode} from 'vis-network';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ddgtopicsexplorer';

  profileForm: FormGroup;
  currentSearch: string;
  network: Network;

  ngOnInit() {
    const firstInput = new FormControl();

    this.profileForm = new FormGroup({
      firstInput
    });
    this.setupNetwork();

  }

  saveSearch() {
    this.currentSearch = this.profileForm.controls.firstInput.value;
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

  setupNetwork() {

  const nodes: NetworkNode[] =  [
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
  ];

  const edges: Edge[] = [
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
  ];

  const container = document.getElementById('ddgTopicNetwork');
  const data = {
    nodes,
    edges
  };
  const options: Options = {
    interaction: {
      dragNodes: true,
      dragView: true,
    },
    physics: {
      enabled: false
    }

  };

  this.network = new Network(container, data, options);
  }
}
