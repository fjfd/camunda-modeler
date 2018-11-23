import React from 'react';

import View from './View';

import errorMessageFunctions from './error-messages';


const defaultState = {
  isLoading: false,
  success: '',
  error: '',
  endpointUrl: '',
  tenantId: '',
  deploymentName: ''
};

class DeployDiagramModal extends React.Component {
  constructor() {
    super();

    this.state = defaultState;
  }

  handleDeploy = async (event) => {
    event.preventDefault();

    this.setState({
      success: '',
      error: '',
      isLoading: true
    });

    const payload = this.getDeploymentPayload();

    try {
      await this.props.onDeploy(payload);

      this.setState({
        isLoading: false,
        success: `Successfully deployed diagram to ${payload.endpointUrl}`,
        error: ''
      });
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);

      this.setState({
        isLoading: false,
        success: '',
        error: errorMessage
      });
    }
  }

  handleEndpointUrlChange = event => this.setState({ endpointUrl: event.target.value });

  handleTenantIdChange = event => this.setState({ tenantId: event.target.value });

  handleDeploymentNameChange = event => this.setState({ deploymentName: event.target.value });

  render() {
    return <View
      onClose={ this.props.onClose }
      onDeploy={ this.handleDeploy }
      onEndpointUrlChange={ this.handleEndpointUrlChange }
      onTenantIdChange={ this.handleTenantIdChange }
      onDeploymentNameChange={ this.handleDeploymentNameChange }

      isLoading={ this.state.isLoading }
      success={ this.state.success }
      error={ this.state.error }
      endpointUrl={ this.state.endpointUrl }
      tenantId={ this.state.tenantId }
      deploymentName={ this.state.deploymentName }
    />;
  }

  getDeploymentPayload() {
    const payload = {
      endpointUrl: this.state.endpointUrl,
      deploymentName: this.state.deploymentName,
      tenantId: this.state.tenantId
    };

    return payload;
  }

  getErrorMessage(error) {
    let errorMessage;

    for (const getMessage of errorMessageFunctions) {
      errorMessage = getMessage(error);

      if (errorMessage) {
        return errorMessage;
      }
    }

    return 'Unknown error occurred.';
  }
}

export default DeployDiagramModal;