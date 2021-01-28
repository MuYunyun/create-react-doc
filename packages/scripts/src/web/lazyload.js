import { Component as ReactComponent } from 'react'

let defaultLoadingComponent = null

/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
export default function dynamicLoadable({
  component,
  LoadingComponent,
  models: resolveModels,
}) {
  // keep Component in a closure to avoid doing this stuff more than once
  let Component = null
  class AsyncRouteComponent extends ReactComponent {
    static async getInitialProps(ctx) {
      // Need to call the wrapped components getInitialProps if it exists
      if (Component !== null) {
        return Component.getInitialProps ? Component.getInitialProps(ctx) : Promise.resolve(null)
      }
      return Promise.resolve(null)
    }

    /**
     * Static so that you can call load against an uninstantiated version of
     * this component. This should only be called one time outside of the
     * normal render path.
     */
    static async load() {
      let models = typeof resolveModels === 'function' ? resolveModels() : []
      models = !models ? [] : models
      if (models.length > 0) await Promise.all([...models])
      const Com = await component()
      if (Com) {
        Component = Com.default || Com
      }
    }

    constructor(props) {
      super(props)
      this.updateState = this.updateState.bind(this)
      this.state = {
        Component,
      }
      AsyncRouteComponent.load().then(this.updateState)
    }

    updateState() {
      // Only update state if we don't already have a reference to the
      // component, this prevent unnecessary renders.
      if (this.state.Component !== Component) {
        this.setState({
          Component,
        })
      }
    }

    render() {
      const { ...other } = this.props
      const { Component: ComponentFromState } = this.state
      const Loading = LoadingComponent || defaultLoadingComponent
      if (ComponentFromState) {
        return <ComponentFromState {...other} />
      }

      if (Loading) {
        return <Loading {...other} />
      }

      return null
    }
  }
  return AsyncRouteComponent
}

dynamicLoadable.setDefaultLoadingComponent = (LoadingComponent) => {
  defaultLoadingComponent = LoadingComponent
}
